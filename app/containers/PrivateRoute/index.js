/**
 *
 * Private Route
 *
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import LoadingIndicator from 'components/LoadingIndicator';
import PropTypes from 'prop-types';
import { checkPermissionForComponent } from 'utils/permission';
import PermissionDeniedPage from 'containers/PermissionDeniedPage';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
});

const PrivateRoute = (props) => {
  const { path, resource, method, defaultPermission } = props;
  const { isLogged, user } = useSelector(stateSelector);
  const [permitted, setPermitted] = useState(true);

  useEffect(() => {
    if (isLogged) {
      setPermitted(
        checkPermissionForComponent(user.role, {
          path,
          resource,
          method,
          defaultPermission,
        }),
      );
    }
  }, [path]);

  if (isLogged === null) {
    return <LoadingIndicator />;
  }
  if (!permitted) {
    return <PermissionDeniedPage />;
  }
  return isLogged ? <Route {...props} /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  defaultPermission: PropTypes.bool,
  path: PropTypes.string,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default PrivateRoute;
