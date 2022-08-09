// @ts-nocheck
/* eslint-disable import/no-import-module-exports */
/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import 'assets/sass/main.scss';
import App from 'containers/App';
import LanguageProvider from 'containers/LanguageProvider';
import '!file-loader?name=[name].[ext]!./assets/images/icons/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
import { saveState } from 'services/persist.service';
import { throttle } from 'lodash';
import reportWebVitals from 'reportWebVitals';
import { store } from './store';
import { translationMessages } from './i18n';

const MOUNT_NODE = document.getElementById('app');

store.subscribe(
  throttle(() => {
    saveState({
      language: store.getState().language,
      // global: store.getState().global,
    });
  }, 1000),
);

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <App />
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

render(translationMessages);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  reportWebVitals(console.log);
}
