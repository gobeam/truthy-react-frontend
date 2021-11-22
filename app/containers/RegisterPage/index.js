/**
 *
 * Register Page
 *
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import reducer from 'containers/RegisterPage/reducer';
import messages from 'containers/RegisterPage/messages';
import saga from 'containers/RegisterPage/saga';
import RegisterForm from 'containers/RegisterPage/registerForm';
import { createStructuredSelector } from 'reselect';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { hideHeaderAction } from 'containers/App/actions';
import 'containers/RegisterPage/index.less';
import { Row, Col } from 'antd';

const key = 'register';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(stateSelector);
  const hideHeader = () => dispatch(hideHeaderAction(true));

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    hideHeader();
  }, [user]);

  return (
    <div className="register-page">
      <FormattedMessage {...messages.helmetRegisterTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Row className="register-center">
        <Col xl={24} lg={10} md={10} xs={16} className="m-auto">
          <RegisterForm />
        </Col>
      </Row>
    </div>
  );
}
