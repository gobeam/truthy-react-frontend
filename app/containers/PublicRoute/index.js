/**
 *
 * Private Route
 *
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeIsLoggedSelector } from 'containers/App/selectors';
import LoadingIndicator from 'components/LoadingIndicator';
import Common from 'utils/common';
import { SUCCESS_REDIRECT } from 'containers/LoginPage/constants';

const stateSelector = createStructuredSelector({
  isLogged: makeIsLoggedSelector(),
});

const PublicRoute = ({ ...props }) => {
  const navigate = useNavigate();
  const { isLogged } = useSelector(stateSelector);

  useEffect(() => {
    if (isLogged) {
      const redirectUrl = Common.getParameterByName('path') || SUCCESS_REDIRECT;
      navigate(redirectUrl);
    }
  }, [isLogged]);

  if (isLogged === null) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <Route {...props} />
    </>
  );
};

export default PublicRoute;
