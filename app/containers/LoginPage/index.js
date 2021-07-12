/**
 *
 * LoginPage
 *
 */

import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/LoginPage/reducer';
import LoginForm from 'containers/LoginPage/loginForm';
import saga from 'containers/LoginPage/saga';
import 'containers/LoginPage/index.less';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/LoginPage/messages';

const key = 'login';

export default function LoginPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div className="login-page">
      <FormattedMessage {...messages.helmetLoginTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <LoginForm />
    </div>
  );
}
