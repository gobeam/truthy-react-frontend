/**
 *
 * ResetPasswordPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ResetPasswordPage/saga';
import reducer from 'containers/ResetPasswordPage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeFieldAction,
  validateFormAction,
} from 'containers/ResetPasswordPage/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeConfirmPasswordSelector,
  makeErrorsSelector,
  makePasswordSelector,
} from 'containers/ResetPasswordPage/selectors';
import { Helmet } from 'react-helmet';
import {
  hideHeaderAction,
  publicRedirectLoggedAction,
} from 'containers/App/actions';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/ResetPasswordPage/messages';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import BgImage from 'assets/img/illustrations/signin.svg';
import AuthFormGroupWrapper from 'components/AuthFormGroupWrapper';
import loginMessages from 'components/LoginForm/messages';

const key = 'resetPassword';

const stateSelector = createStructuredSelector({
  password: makePasswordSelector(),
  confirmPassword: makeConfirmPasswordSelector(),
  errors: makeErrorsSelector(),
});

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  const redirectIfLogged = () => dispatch(publicRedirectLoggedAction());
  useInjectReducer({ key, reducer });
  const hideHeader = () => dispatch(hideHeaderAction(true));
  const submitResetPasswordPageForm = (e) =>
    dispatch(validateFormAction()) && e.preventDefault();
  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));
  const { password, confirmPassword, errors } = useSelector(stateSelector);
  const { code } = useParams();

  useEffect(() => {
    hideHeader();
  }, []);

  useEffect(() => {
    redirectIfLogged();
    dispatch(changeFieldAction('code', code));
  }, [code]);

  return (
    <main>
      <FormattedMessage {...messages.helmetResetPasswordTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to="/" className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
              <FormattedMessage {...messages.back} />
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">
                    <FormattedMessage {...messages.resetPassword} />
                  </h3>
                </div>
                <Form
                  noValidate
                  validated={errors.length < 1}
                  className="mt-4"
                  onSubmit={submitResetPasswordPageForm}
                >
                  <AuthFormGroupWrapper
                    label={loginMessages.password}
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    required={false}
                    focus={false}
                    placeholder={loginMessages.passwordPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.password}
                  />

                  <AuthFormGroupWrapper
                    label={loginMessages.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    required={false}
                    focus={false}
                    placeholder={loginMessages.passwordPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.confirmPassword}
                  />
                  <Button variant="primary" type="submit" className="w-100">
                    <FormattedMessage {...messages.resetPasswordBtn} />
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
