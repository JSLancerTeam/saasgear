import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import classnames from 'classnames';

import logo from '@/assets/images/logo.png';
import getQueryParam from '@/utils/getQueryParam';
import verifyEmailQuery from '@/queries/auth/verifyEmail';

export default function VerifyEmail() {
  const query = getQueryParam();
  const token = query.get('token');
  const history = useHistory();
  const [verifyEmailMutation, { error, loading }] = useMutation(
    verifyEmailQuery,
  );
  const [verifyResult, setVerifyResult] = useState(null);

  useEffect(() => {
    if (!token) {
      history.replace('/');
    }
    verify();
  }, []);

  async function verify() {
    const { data } = await verifyEmailMutation({
      variables: { token },
    });
    if (data) setVerifyResult(data);
  }

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
                    'bg-green-500': verifyResult,
                    'bg-gray-500': !verifyResult,
                  },
                )}
              >
                <span className="inline-block align-middle mr-8">
                  <b className="capitalize">
                    {verifyResult !== null
                      ? 'Verify email success'
                      : error?.message}
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
