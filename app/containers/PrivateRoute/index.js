/**
 *
 * Private Route
 *
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import LoadingIndicator from 'components/LoadingIndicator';
import Header from 'components/Header/index';
import PropTypes from 'prop-types';
import { checkPermissionForComponent } from 'utils/permission';
import PermissionDeniedPage from 'containers/PermissionDeniedPage';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
});

const PrivateRoute = ({
  component: Component,
  path,
  resource,
  method,
  defaultPermission,
  ...rest
}) => {
  const { isLogged, user } = useSelector(stateSelector);
  const [permitted, setPermitted] = useState(true);

  useEffect(() => {
    if (user) {
      setPermitted(
        checkPermissionForComponent(user.role, {
          path,
          resource,
          method,
          defaultPermission,
        }),
      );
    }
  }, [user]);

  if (isLogged === null) {
    return <LoadingIndicator />;
  }
  if (!permitted) {
    return <PermissionDeniedPage />;
  }
  return (
    <>
      <Header />
      <Route
        {...rest}
        render={(props) => {
          if (!isLogged) {
            return <Redirect to="/login" />;
          }
          return <Component {...props} />;
        }}
      />
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  defaultPermission: PropTypes.bool,
  path: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default PrivateRoute;
