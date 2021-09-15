import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { JWT_STORAGE_KEY } from '@/constants';
import * as H from "history";

type Props = {
  component: React.ElementType;
  path: string | string[];
  location?: H.Location;
}

const PublicRoute: React.FC<Props> = ({ component: Component, path, ...restProps }) => (
  <Route
    {...restProps}
    path={path}
    render={(props) =>
      localStorage.getItem(JWT_STORAGE_KEY) ? (
        <Redirect to={{ pathname: '/dashboard', state: props.location }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PublicRoute;
