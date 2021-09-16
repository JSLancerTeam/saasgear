import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import getQueryParam from '@/utils/getQueryParam';
import socialLoginQuery from '@/queries/auth/socialLogin';
import { toggleToastError } from '@/features/auth/user';
import FormRegister from './FormRegister';

type Params = {
  provider: string;
}

const Social: React.FC = () => {
  const query = getQueryParam();
  const code = query.get('code');
  const { provider } = useParams<Params>();
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, loading, error } = useQuery(socialLoginQuery, {
    variables: { provider: provider.toUpperCase(), code },
  });

  useEffect(() => {
    if (!loading && data?.loginBySocial) {
      history.replace('/');
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

  return (
    <>
      {loading ? (
        <div>{provider}</div>
      ) : (
        !error && <FormRegister data={data?.loginBySocial} />
      )}
    </>
  )
}

export default Social;
