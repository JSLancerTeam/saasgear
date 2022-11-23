import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Auth from '@/containers/Auth/Auth';
import PrivateRoute from '@/routes/PrivateRoute';
import PublicRoute from '@/routes/PublicRoute';
import AdminLayout from '@/containers/Layout/Admin';
import VerifyEmail from '@/containers/VerifyEmail';
import Social from '@/containers/Social';
import AcceptInvitation from '@/containers/Teams/AcceptInvitation';
import { createClient } from '@/config/apollo';
import GlobalLoading from '@/components/Layout/GlobalLoading';
import 'react-toastify/dist/ReactToastify.css';
import useDocumentHeader from './hooks/useDocumentTitle';
import { RootState } from './config/store';

const client = createClient();

const App: React.FC = () => {
  const { t } = useTranslation();
  useDocumentHeader({ title: t('Common.title.saasgear') });
  const { error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GlobalLoading />
        <ToastContainer />
        <Switch>
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/social/:provider/callback" component={Social} />
          <Route
            path="/teams/invitation/:invitationToken"
            component={AcceptInvitation}
          />
          <PublicRoute path="/auth" component={Auth} />
          <PrivateRoute render={() => <AdminLayout />} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
