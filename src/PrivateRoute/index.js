import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('user-jwt') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  export default PrivateRoute;
                    