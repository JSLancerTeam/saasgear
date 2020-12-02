import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Auth = () => (
  <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <img className="mx-auto h-12 w-auto" src={logo} alt="JSlancer" />
        <div>
          <Switch>
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
            <Route path="/auth/forgot-password" component={ForgotPassword} />
            <Route path="/auth/reset-password" component={ResetPassword} />
          </Switch>
        </div>
      </div>
    </div>
  </>
);

export default Auth;
