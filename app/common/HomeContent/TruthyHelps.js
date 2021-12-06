import {
  DingtalkOutlined,
  PieChartOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React from 'react';

function TruthyHelps() {
  return (
    <div className="truthy-help-content">
      <h3 className="text-center">What Truthy helps you ?</h3>
      <div className="truthy-helps ">
        <div className="container">
          <Row gutter={20}>
            <Col lg={8}>
              <Card className="card-one">
                <div className="card-inner">
                  <div className="img-wrap">
                    <PieChartOutlined />
                  </div>
                  <h4>UI & UX Design</h4>
                  <p>
                    The set is built on the principles of the atomic design
                    system. It helps you to create projects fastest and easily
                    customized packages for your projects.
                  </p>
                </div>
              </Card>
            </Col>
            <Col lg={8}>
              <Card className="card-two">
                <div className="card-inner">
                  <div className="img-wrap">
                    <DingtalkOutlined />
                  </div>
                  <h4>Development</h4>
                  <p>
                    Easy to customize and extend each component, saving you time
                    and money.
                  </p>
                </div>
              </Card>
            </Col>
            <Col lg={8}>
              <Card className="card-three">
                <div className="card-inner">
                  <div className="img-wrap">
                    <ProjectOutlined />
                  </div>
                  <h4>Branding</h4>
                  <p>
                    Consistent design in colors, fonts ... makes brand
                    recognition easy.
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default TruthyHelps;
