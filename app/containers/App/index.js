/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SnackBar from 'containers/SnackBar';
import { privateRoutes, publicRoutes } from 'routes';
import PrivateRoute from 'containers/PrivateRoute';
import {
  isLoggedAction,
  queryNotificationAction,
} from 'containers/App/actions';
import Footer from 'components/Footer';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { createStructuredSelector } from 'reselect';
import {
  makeHideHeaderSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  hideHeader: makeHideHeaderSelector(),
});

const key = 'global';
export default function App() {
  const dispatch = useDispatch();
  const checkIfLogged = () => dispatch(isLoggedAction());
  const queryNotification = () => dispatch(queryNotificationAction());
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { user } = useSelector(stateSelector);

  useEffect(() => {
    queryNotification();
  }, [user]);

  useEffect(() => {
    checkIfLogged();
    window.addEventListener('storage', (e) => {
      if (e.key === 'access_token') {
        window.location.reload();
      }
    });
  }, []);
  return (
    <>
      <Helmet titleTemplate="%s - Truthy" defaultTitle="TRUTHY">
        <meta name="description" content="Truthy CMS" />
      </Helmet>
      <Switch>
        {publicRoutes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}

        {privateRoutes.map((route) => (
          <PrivateRoute
            key={route.name}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}

        <Route path="*" component={NotFoundPage} />
      </Switch>
      <SnackBar />
      <Footer />
    </>
  );
}
