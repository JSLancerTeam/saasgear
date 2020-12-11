import React, { useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
// import PropTypes from 'prop-types';
import logo from '@/assets/images/logo.png';

AcceptInvitation.propTypes = {

};

function AcceptInvitation() {
  const { invitationToken } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (!invitationToken) {
      // history.push('/')
      console.log('history :>> ', history);
    }

  }, [invitationToken])

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <img className="h-48 w-auto" src={logo} alt="JSlancer" />
        <div className="p-10">
          <div className="text-3xl">Accept Invitation?</div>
          <div className="text-gray-400 mb-4">
            You&apos; ve been invitated to join .... by David@jslancer.com
          </div>
          <a
            href={`/auth/signup?invitation=${invitationToken}`}
            className="group flex items-center justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Create Account to Accept
          </a>
        </div>
      </div>
    </div>
  );
}

export default AcceptInvitation;