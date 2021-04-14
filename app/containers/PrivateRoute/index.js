/**
 *
 * Private Route
 *
 */

import React from 'react';
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

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  isLogged: makeIsLoggedSelector(),
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useSelector(stateSelector);

  if (isLogged === null) {
    return <LoadingIndicator />;
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
  component: PropTypes.func,
  navItems: PropTypes.array,
};

export default PrivateRoute;
