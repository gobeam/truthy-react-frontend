import {
  DingtalkOutlined,
  LockOutlined,
  RiseOutlined,
  ProjectOutlined,
  FileDoneOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from 'containers/HomePage/messages';

const TruthyHelps = () => {
  const intl = useIntl();

  const functionalities = [
    {
      icon: <RiseOutlined />,
      title: intl.formatMessage(messages.popularTitle),
      description: intl.formatMessage(messages.popularDescription),
    },
    {
      icon: <LockOutlined />,
      title: intl.formatMessage(messages.securityTitle),
      description: intl.formatMessage(messages.securityDescription),
    },
    {
      icon: <DingtalkOutlined />,
      title: intl.formatMessage(messages.developmentTitle),
      description: intl.formatMessage(messages.developmentDescription),
    },
    {
      icon: <ProjectOutlined />,
      title: intl.formatMessage(messages.moduleTitle),
      description: intl.formatMessage(messages.moduleDescription),
    },
    {
      icon: <FileDoneOutlined />,
      title: intl.formatMessage(messages.customizeTitle),
      description: intl.formatMessage(messages.customizeDescription),
    },
    {
      icon: <DeploymentUnitOutlined />,
      title: intl.formatMessage(messages.deploymentTitle),
      description: intl.formatMessage(messages.deploymentDescription),
    },
  ];

  return (
    <div className="truthy-help-content">
      <h3 className="text-center heading">
        {intl.formatMessage(messages.truthyHelp)}
      </h3>
      <div className="truthy-helps ">
        <div className="container">
          <Row gutter={20}>
            {functionalities.map((functionality) => (
              <Col lg={8} key={functionality.title}>
                <Card>
                  <div className="card-inner">
                    <div className="img-wrap">{functionality.icon}</div>
                    <h4>{functionality.title}</h4>
                    <p>{functionality.description}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TruthyHelps;
