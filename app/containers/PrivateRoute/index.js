/**
 *
 * Private Route
 *
 */

import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
  makeOtpErrorSelector,
  makeOtpVerificationSelector,
} from 'containers/App/selectors';
import PermissionDeniedPage from 'containers/PermissionDeniedPage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { checkPermissionForComponent } from 'utils/permission';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  otpError: makeOtpErrorSelector(),
  isLogged: makeIsLoggedSelector(),
  otpVerified: makeOtpVerificationSelector(),
});

const PrivateRoute = (props) => {
  const { path, resource, method, defaultPermission } = props;
  const { isLogged, user, otpVerified } = useSelector(stateSelector);
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
  }, [user, path]);

  if (isLogged === null) {
    return <LoadingIndicator />;
  }

  if (!permitted && otpVerified) {
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
