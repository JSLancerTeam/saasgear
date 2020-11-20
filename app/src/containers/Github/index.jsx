import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import getQueryParam from '@/utils/getQueryParam';
import githubLoginQuery from '@/queries/auth/githubLogin';
import { JWT_STORAGE_KEY } from '@/constants';
import FormRegister from './FormRegister';

export default function Github() {
  const query = getQueryParam();
  const code = query.get('code');
  const { data, loading } = useQuery(githubLoginQuery, { variables: { code } });

  const history = useHistory();

  useEffect(() => {
    if (!loading && data?.loginByGithub?.token) {
      localStorage.setItem(JWT_STORAGE_KEY, data.loginByGithub.token);
      history.push('/');
    }
  }, [data, loading]);

  return loading ? (
    <div>Loading....</div>
  ) : (
    <FormRegister data={data?.loginByGithub} />
  );
}
