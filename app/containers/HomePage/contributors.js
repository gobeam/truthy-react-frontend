import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import messages from 'containers/HomePage/messages';

const Contributors = ({ contributors, loading = true }) => {
  const intl = useIntl();
  return (
    <div className="contributors">
      <h3 className="text-center heading">
        {intl.formatMessage(messages.contribTitle)}
      </h3>
      <div className="truthy-helps ">
        <div className="container">
          <Row gutter={20}>
            {contributors?.map((item) => (
              <Col xl={8} lg={8} sm={8} key={item.author}>
                <Card
                  loading={loading}
                  className="card-contibution"
                  cover={
                    <img
                      alt={item.author}
                      src={`https://www.gravatar.com/avatar/${item.gravatar}?s=250&d=blank`}
                    />
                  }
                >
                  <div className="card-inner">
                    {/* <div className="img-wrap">
                      <h4 className="text-center">{item.author}</h4>
                    </div> */}
                    <h4>{item.author}</h4>
                    <p className="mb-3">{item.designation}</p>

                    <div className="designation d-flex">
                      <div className="icon">
                        <a href={`mailto:${item.email}`} target="_blank">
                          <MailOutlined />
                        </a>
                      </div>
                      <div className="icon git">
                        <a href={item.social.github} target="_blank">
                          <GithubOutlined />
                        </a>
                      </div>
                      <div className="icon linked">
                        <a href={item.social.linkedin} target="_blank">
                          <LinkedinOutlined />
                        </a>
                      </div>
                    </div>
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

Contributors.propTypes = {
  contributors: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default Contributors;
