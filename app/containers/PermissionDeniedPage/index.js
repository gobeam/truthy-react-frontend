/**
 * PermissionDeniedPage
 *
 * This is the page we show when the user visits a url that doesn't have permission to a route
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Container,
} from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import NotFoundImage from 'assets/img/illustrations/404.svg';
import messages from 'containers/PermissionDeniedPage/messages';

/**
 * @return {boolean}
 */

const PermissionDeniedPage = () => (
  <main>
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col
            xs={12}
            className="text-center d-flex align-items-center justify-content-center"
          >
            <div>
              <Card.Link as={Link} to="/">
                <Image src={NotFoundImage} className="img-fluid w-75" />
              </Card.Link>
              <h1 className="text-primary mt-5">
                <FormattedMessage {...messages.header} />
              </h1>
              <p className="lead my-4">
                <FormattedMessage {...messages.message} />
              </p>
              <Button
                as={Link}
                variant="primary"
                className="animate-hover"
                to="/"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="animate-left-3 me-3 ms-2"
                />
                <FormattedMessage {...messages.back} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </main>
);

export default PermissionDeniedPage;
