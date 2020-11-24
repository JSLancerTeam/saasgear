import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import getQueryParam from '@/utils/getQueryParam';
import githubLoginQuery from '@/queries/auth/githubLogin';
import { JWT_STORAGE_KEY } from '@/constants';
import { toggleToastError } from '@/features/auth/user';
import FormRegister from './FormRegister';


export default function Github() {
  const query = getQueryParam();
  const code = query.get('code');
  const { data, loading, error } = useQuery(githubLoginQuery, {
    variables: { code },
  });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!loading && data?.loginByGithub?.token) {
      localStorage.setItem(JWT_STORAGE_KEY, data.loginByGithub.token);
      history.push('/');
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (error) {
      dispatch(toggleToastError({ error: error.message }));
      history.push('/auth/signin');
    }
    return () => {
      dispatch(toggleToastError({ error: null }));
    };
  }, [error]);

  return loading ? (
    <div>Loading....</div>
  ) : (
    !error && <FormRegister data={data?.loginByGithub} />
  );
}
