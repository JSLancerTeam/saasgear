import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Auth: React.FC = () => (
  <Switch>
    <Route path="/auth/signin" component={SignIn} />
    <Route path="/auth/signup" component={SignUp} />
    <Route path="/auth/forgot-password" component={ForgotPassword} />
    <Route path="/auth/reset-password" component={ResetPassword} />
  </Switch>
);

export default Auth;
