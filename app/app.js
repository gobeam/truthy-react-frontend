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
// Import root app
import App from 'containers/App';
// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
// Load the favicon and the .htaccess file
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
// Import i18n messages
import { saveState } from 'services/persist.service';
import { throttle } from 'lodash';
import reportWebVitals from 'reportWebVitals';
import { shouldPolyfill } from '@formatjs/intl-numberformat/should-polyfill';
import { store } from './store';
import { DEFAULT_LOCALE, translationMessages } from './i18n';

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

async function polyfill(locale) {
  if (shouldPolyfill()) {
    await import('@formatjs/intl-numberformat/polyfill');
  }
  if (Intl.NumberFormat.polyfilled) {
    switch (locale) {
      default:
        await import('@formatjs/intl-numberformat/locale-data/en');
        break;
      case 'ne':
        await import('@formatjs/intl-numberformat/locale-data/ne');
        break;
    }
  }
}

// Chunked polyfill for browsers without Intl support
const lang =
  store.getState().language && store.getState().language.locale
    ? store.getState().language.locale
    : DEFAULT_LOCALE;
polyfill(lang)
  .then(() => {
    render(translationMessages);
  })
  .catch((err) => {
    throw err;
  });

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  reportWebVitals(console.log);
}
