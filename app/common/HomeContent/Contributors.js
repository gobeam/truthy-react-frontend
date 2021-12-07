import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
// import contibution from 'https://gobeam.github.io/truthy-contributors/contributors.json'

function Contributors() {
  const contibution = [
    {
      author: 'Roshan Ranabhat',
      social: {
        github: 'https://github.com/gobeam',
        linkedin: 'https://www.linkedin.com/in/roshan-ranabhat/',
      },
      designation: 'Full Stack Developer',
    },
    {
      author: 'Urmila Shahi Thakuri',
      social: {
        github: 'https://github.com/urmilasai',
        linkedin: '',
      },
      designation: 'Frontend Developer',
    },
  ];
  return (
    <div className="contributors">
      <h3 className="text-center heading">Meet Our Team</h3>
      <div className="truthy-helps ">
        <div className="container">
          <Row gutter={20}>
            {contibution?.map((item) => (
              <Col xl={8} lg={8} sm={8}>
                <Card className="card-contibution">
                  <div className="card-inner">
                    <div className="img-wrap">
                      <h4 className="text-center">{item.author}</h4>
                    </div>
                    <h4>{item.author}</h4>
                    <p className="mb-3">{item.designation}</p>

                    <div className="designation d-flex">
                      <div className="icon git">
                        <Link to={item.social.github} target="_blank">
                          {' '}
                          <GithubOutlined />
                        </Link>
                      </div>
                      <div className="icon linked">
                        <Link to={item.social.linkedin} target="_blank">
                          {' '}
                          <LinkedinOutlined />
                        </Link>
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
}

export default Contributors;
