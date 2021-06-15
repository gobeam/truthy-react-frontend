/**
 *
 * Private Route
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import LoadingIndicator from 'components/LoadingIndicator';
import PropTypes from 'prop-types';
import { publicRedirectLoggedAction } from 'containers/App/actions';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
});

const PublicRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector(stateSelector);
  const redirectIfLogged = () => dispatch(publicRedirectLoggedAction());

  useEffect(() => {
    if (user) {
      redirectIfLogged();
    }
  }, [user]);

  if (isLogged === null) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
