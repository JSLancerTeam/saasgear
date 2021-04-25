import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import Auth from '@/containers/Auth/Auth';
import PrivateRoute from '@/routes/PrivateRoute';
import AdminLayout from '@/containers/Layout/Admin';
import VerifyEmail from '@/containers/VerifyEmail';
import Social from '@/containers/Social';
import AcceptInvitation from '@/containers/Teams/AcceptInvitation';
import { client } from '@/config/apollo';
import GlobalLoading from '@/components/Layout/GlobalLoading';
import GlobalStyle from '@/theme/globalStyles';
import 'react-toastify/dist/ReactToastify.css';
import useDocumentHeader from './hooks/useDocumentTitle';

function App() {
  useDocumentHeader({ title: 'SaaSgear' });
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GlobalStyle />
        <GlobalLoading />
        <ToastContainer />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/social/:provider/callback" component={Social} />
          <Route
            path="/teams/invitation/:invitationToken"
            component={AcceptInvitation}
          />
          <PrivateRoute render={(props) => <AdminLayout {...props} />} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
