import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? ( // FIXME: check auth here
          render(props)
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
    />
  );
};

export default PrivateRoute;
