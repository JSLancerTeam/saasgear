import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { JWT_STORAGE_KEY } from '@/constants';

const PrivateRoute = ({ render }) => (
  <Route
    render={(props) =>
      localStorage.getItem(JWT_STORAGE_KEY) ? (
        render(props)
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  render: PropTypes.func,
  location: PropTypes.object,
};

export default PrivateRoute;
