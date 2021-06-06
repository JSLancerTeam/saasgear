import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { JWT_STORAGE_KEY } from '@/constants';

const PublicRoute = ({ component: Component, path, ...restProps }) => (
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

PublicRoute.propTypes = {
  component: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  location: PropTypes.object,
};

export default PublicRoute;
