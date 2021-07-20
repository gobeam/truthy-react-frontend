import React from 'react';
import moment from 'moment-timezone';
import messages from 'components/Footer/messages';
import { Button, Card, Col, Row } from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import GitHubButton from 'react-github-btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faDownload } from '@fortawesome/free-solid-svg-icons';
import LocaleToggle from 'containers/LocaleToggle';
import { Layout } from 'antd';
import { useLocalStorage } from 'hooks/localstorage';

const { Footer } = Layout;

const FooterComponent = () => {
  const currentYear = moment().get('year');

  const [showSettings, setShowSettings] = useLocalStorage(
    'settingsVisible',
    false,
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <Footer>
      {showSettings ? (
        <Card className="theme-settings">
          <Card.Body className="pt-4">
            <Button
              className="theme-settings-close"
              variant="close"
              size="sm"
              aria-label="Close"
              onClick={() => {
                toggleSettings(false);
              }}
            />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="m-0 mb-1 fs-7">
                <FormattedMessage {...messages.licenseMessage} />
              </p>
              <GitHubButton
                href="https://github.com/gobeam/truthy"
                data-size="large"
                data-show-count="true"
                aria-label="Star gobeam/truthy on GitHub"
              >
                <FormattedMessage {...messages.star} />
              </GitHubButton>
            </div>
            <Button
              href="https://github.com/gobeam/truthy"
              target="_blank"
              variant="primary"
              className="mb-3 w-100"
            >
              <FontAwesomeIcon icon={faDownload} className="me-1" />
              <FormattedMessage {...messages.download} />
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card
          className="theme-settings theme-settings-expand"
          onClick={() => {
            toggleSettings(true);
          }}
        >
          <Card.Body className="p-3 py-2">
            <span className="fw-bold h6">
              <FontAwesomeIcon icon={faCogs} className="me-1 fs-7" />
              <FormattedMessage {...messages.settings} />
            </span>
          </Card.Body>
        </Card>
      )}
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              <FormattedMessage {...messages.copyright} /> © 2021
              {`${currentYear !== 2021 ? `-${currentYear}` : ''} `}
              <Card.Link
                href="https://github.com/gobeam/truthy"
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                <FormattedMessage {...messages.appName} />
              </Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <FormattedMessage {...messages.language} />
                <LocaleToggle />
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </Footer>
  );
};

export default FooterComponent;
