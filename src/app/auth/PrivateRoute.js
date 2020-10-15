// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUser from './useUser';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Fragment>
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          </Fragment>
        )
      }
    />
  );
};

export default PrivateRoute;
