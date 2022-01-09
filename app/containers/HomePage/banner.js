import { Button, Col, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import Welcome from 'assets/images/reporting.gif';
import messages from 'containers/HomePage/messages';

const Banner = () => {
  const intl = useIntl();
  return (
    <div className="banner">
      <div className="container">
        <Row gutter={[16, 16]} className="align-items-center">
          <Col sm={10}>
            <div className="banner-content">
              <h2>{intl.formatMessage(messages.header)}</h2>
              <p>{intl.formatMessage(messages.description)}</p>
              <Button className="round" type="primary">
                <a href="https://github.com/gobeam/truthy" target="_blank">
                  {' '}
                  {intl.formatMessage(messages.startedButton)}
                </a>
              </Button>
            </div>
          </Col>
          <Col sm={14}>
            <div className="side-image text-right">
              <img src={Welcome} className="img-fluid" alt="banner-img" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Banner;
