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
import RegisterForm from 'components/RegisterForm';
import { isLoggedAction } from 'containers/RegisterPage/actions';
import { createStructuredSelector } from 'reselect';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { hideHeaderAction } from 'containers/App/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Container, Row } from '@themesberg/react-bootstrap';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import BgImage from 'assets/img/illustrations/signin.svg';

const key = 'register';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(stateSelector);
  const isLogged = () => dispatch(isLoggedAction());
  const hideHeader = () => dispatch(hideHeaderAction(true));

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    isLogged();
    hideHeader();
  }, [user]);

  return (
    <main>
      <FormattedMessage {...messages.helmetRegisterTitle}>
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
                    <FormattedMessage {...messages.createAccount} />
                  </h3>
                </div>
                <RegisterForm />
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    <FormattedMessage {...messages.alreadyAccount} />
                    <Card.Link as={Link} to="/register" className="fw-bold">
                      <FormattedMessage {...messages.loginHere} />
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
