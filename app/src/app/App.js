import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from 'routes/PrivateRoute';
import AdminLayout from 'components/Layout/Admin';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import apolloClient from './apollo';
import 'assets/main.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute render={(props) => <AdminLayout {...props} />} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
