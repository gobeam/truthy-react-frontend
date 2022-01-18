/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RenderRouter from 'routes';
import { getProfileAction } from 'containers/App/actions';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import { Layout } from 'antd';
import 'containers/App/index.less';
import GlobalStyle from 'global-styles';
import SnackMessage from 'containers/SnackMessage';

const key = 'global';
export default function App() {
  const dispatch = useDispatch();
  const getLoggedInUserProfile = () => dispatch(getProfileAction());
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getLoggedInUserProfile();
  }, []);
  return (
    <>
      <Helmet titleTemplate="%s - Truthy" defaultTitle="TRUTHY">
        <meta name="description" content="Truthy CMS" />
      </Helmet>
      <GlobalStyle />
      <SnackMessage />
      <Layout>
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </Layout>
    </>
  );
}
