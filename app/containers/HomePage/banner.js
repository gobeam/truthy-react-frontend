import { Button, Col, Row } from 'antd';
import React from 'react';
// @ts-ignore
import Welcome from '../../assets/images/reporting.gif';

function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <Row gutter={[16, 16]} className="align-items-center">
          <Col sm={10}>
            <div className="banner-content">
              <h2>Make Potential Possible</h2>
              <p>
                Lorem Loream Loream Lorem Lorem
                LoremLoremLoremLoremLoremLoremLorem
              </p>
              <Button className="round" type="primary">
                Get Started
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
}

export default Banner;
