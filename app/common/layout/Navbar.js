import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from 'containers/HomePage/messages';

function Navbar() {
  return (
    <div className="navbar">
      <Header className="d-flex w-100 headers">
        <div className="container-fluid d-flex w-100">
          <div className="logos"> Truthy</div>
          <div className="header-main">
            <div className="ml-auto">
              <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link className="login-form-forgot" to="/">
                    <FormattedMessage {...messages.home} />
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link className="login-form-forgot" to="/login">
                    <FormattedMessage {...messages.login} />
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
}

export default Navbar;
