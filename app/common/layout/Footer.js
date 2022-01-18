import { Col, Row } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'components/Footer/messages';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = moment().get('year');

  return (
    <footer>
      <div className="container outer-home">
        <Row gutter={20}>
          <Col xs={12} lg={8} className="mb-4 mb-lg-0">
            <div className="d-flex align-items-center">
              <div className="logos">
                <Link to="/">Truthy</Link>
              </div>
              <p className="mb-0 pl-3">
                <FormattedMessage {...messages.copyright} /> © 2021
                {`${currentYear !== 2021 ? `-${currentYear}` : ''} `}
              </p>
            </div>
          </Col>
          <Col xs={12} lg={8} className="mb-4 mb-lg-0"></Col>
          <Col xs={12} lg={8} className="mb-4 mb-lg-0 d-flex">
            <div className="ml-auto">
              {/* <div className="language-wrapper">
              <ul className="list-inline list-group-flush list-group-borderless text-right mb-0">
                <li className="list-inline-item px-0 px-sm-2">
                  <FormattedMessage {...messages.language} />
                  <LocaleToggle />
                </li>
              </ul>
            </div> */}
              <div className="footer-info">
                <Link
                  to="https://github.com/gobeam/truthy"
                  target="_blank"
                  className="text-blue text-decoration-none fw-normal ant-btn ant-btn-primary"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
}

export default Footer;
