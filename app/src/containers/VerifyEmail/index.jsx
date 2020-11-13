import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import logo from 'assets/images/logo.png';

import { GetQueryParam } from '../../common';

const verifyEmailQuery = loader('../../queries/auth/verifyEmail.graphql');

export default function VerifyEmail() {
  const query = GetQueryParam();
  const token = query.get('token');
  const history = useHistory();
  const { data, loading } = useQuery(verifyEmailQuery, {
    variables: { token },
  });

  useEffect(() => {
    if (!token) {
      history.replace('/');
    }
    let timeOut = null;
    if (data && data.verify.verified) {
      timeOut = setTimeout(() => {
        history.replace('/');
      }, 2000);
    }
    return () => {
      if (timeOut) clearTimeout(timeOut);
    };
  }, [token, data, loading]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div>
              <img
                className="mx-auto h-32 w-auto mb-2"
                src={logo}
                alt="JSlancer"
              />

              <div
                className={classnames(
                  'text-white px-6 py-4 border-0 rounded relative mb-4',
                  {
                    'bg-green-500': data.verify.verified,
                    'bg-gray-500': !data.verify.verified,
                  },
                )}
              >
                <span className="inline-block align-middle mr-8">
                  <b className="capitalize">
                    {data.verify.verified
                      ? 'Verify email success'
                      : 'Token không tồn tại hoặc đã hết hạn sử dụng'}
                  </b>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
