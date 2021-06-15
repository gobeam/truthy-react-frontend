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
import PublicRoute from 'containers/PublicRoute';
import {
  getProfileAction,
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
import { useLocalStorage } from 'hooks/localstorage';
import Sidebar from 'components/SideBar';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  hideHeader: makeHideHeaderSelector(),
});

const key = 'global';
export default function App() {
  const dispatch = useDispatch();
  const getLoggedInUserProfile = () => dispatch(getProfileAction());
  const queryNotification = () => dispatch(queryNotificationAction());
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { user } = useSelector(stateSelector);
  const [showSettings, setShowSettings] = useLocalStorage(
    'settingsVisible',
    false,
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    queryNotification();
  }, [user]);

  useEffect(() => {
    getLoggedInUserProfile();
  }, []);
  return (
    <>
      <Helmet titleTemplate="%s - Truthy" defaultTitle="TRUTHY">
        <meta name="description" content="Truthy CMS" />
      </Helmet>
      <Sidebar />
      <main className="content">
        <Switch>
          {publicRoutes.map((route) => (
            <PublicRoute
              key={route.name}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}

          {privateRoutes.map((route) => (
            <PrivateRoute
              defaultPermission={route.defaultPermission}
              key={route.name}
              resource={route.resource}
              path={route.path}
              method={route.method}
              component={route.component}
              exact={route.exact}
            />
          ))}

          <Route path="*" component={NotFoundPage} />
        </Switch>
        <SnackBar />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
}
