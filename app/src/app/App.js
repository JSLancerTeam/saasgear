import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from '@/routes/PrivateRoute';
import AdminLayout from '@/containers/Layout/Admin';
import SignIn from '@/containers/SignIn';
import SignUp from '@/containers/SignUp';
import ForgotPassword from '@/containers/ForgotPassword';
import ResetPassword from '@/containers/ResetPassword';
import VerifyEmail from '@/containers/VerifyEmail';
import apolloClient from './apollo';
import '@/assets/css/main.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/verify-email" component={VerifyEmail} />
          <PrivateRoute render={(props) => <AdminLayout {...props} />} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
