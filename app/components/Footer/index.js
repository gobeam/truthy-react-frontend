import React from 'react';
import moment from 'moment-timezone';
import messages from 'components/Footer/messages';
import { FormattedMessage } from 'react-intl';
import GitHubButton from 'react-github-btn';
import LocaleToggle from 'containers/LocaleToggle';
import { useLocalStorage } from 'hooks/localstorage';
import { Layout, Card, Button, Row, Col } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';

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
        <Card>
          <Button
            size="small"
            aria-label="Close"
            onClick={() => {
              toggleSettings();
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
            type="primary"
            className="mb-3 w-100"
          >
            <DownloadOutlined />
            <FormattedMessage {...messages.download} />
          </Button>
        </Card>
      ) : (
        <Card
          className="theme-settings theme-settings-expand"
          onClick={() => {
            toggleSettings();
          }}
        >
          <span className="fw-bold h6">
            <SettingOutlined />
            <FormattedMessage {...messages.settings} />
          </span>
        </Card>
      )}
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              <FormattedMessage {...messages.copyright} /> © 2021
              {`${currentYear !== 2021 ? `-${currentYear}` : ''} `}
              {/* <Card.Link
                href="https://github.com/gobeam/truthy"
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                <FormattedMessage {...messages.appName} />
              </Card.Link> */}
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
