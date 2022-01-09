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
// import 'containers/LoginPage/index.less';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/LoginPage/messages';
import { Row, Col } from 'antd';

const key = 'login';

export default function LoginPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div className="login-page mh-100">
      <FormattedMessage {...messages.helmetLoginTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Row className="login-center">
        <Col xl={6} lg={10} md={10} xs={16} className="m-auto">
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
}
