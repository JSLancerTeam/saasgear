import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { COLORS, mobileQuery } from '@/constants/style';
import routes from '@/routes';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const LayoutWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: ${COLORS.BODY};
  overflow-y: auto;
  padding: 32px 15px;
  ${mobileQuery} {
    min-height: calc(100vh - 64px);
  }
`;

const AdminLayout = ({ signout }) => (
  <LayoutWrapper>
    <Sidebar />
    <ContentWrapper>
      <Topbar signout={signout} />
      <Content>
        <Switch>
          {routes.map((route) => (
            <Route
              path={route.path}
              component={route.component}
              key={route.path}
              exact={route.exact}
            />
          ))}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </Content>
    </ContentWrapper>
  </LayoutWrapper>
);

AdminLayout.propTypes = {
  signout: PropTypes.func,
};

export default AdminLayout;
