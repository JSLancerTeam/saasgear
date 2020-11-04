import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ render }) => (
  <Route
    render={(props) =>
      // eslint-disable-next-line no-constant-condition
      true ? ( // FIXME: check auth here
        render(props)
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
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
