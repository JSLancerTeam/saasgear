import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from '@/routes';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

type Props = {
  signout: () => void;
}

const AdminLayout: React.FC<Props> = ({ signout }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex flex-col flex-grow">
      <Topbar signout={signout} />
      <div className="flex-grow bg-body overflow-y-auto px-[15px] py-[32px] sm:min-h-[calc(100vh_-_64px)]">
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
      </div>
    </div>
  </div>
);

export default AdminLayout;
