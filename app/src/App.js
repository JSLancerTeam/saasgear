import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from '@/containers/Auth/Auth';
import PrivateRoute from '@/routes/PrivateRoute';
import AdminLayout from '@/containers/Layout/Admin';
import VerifyEmail from '@/containers/VerifyEmail';
import { client } from '@/config/apollo';
import '@/assets/css/main.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/verify-email" component={VerifyEmail} />
          <PrivateRoute render={(props) => <AdminLayout {...props} />} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
