import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import messages from 'containers/HomePage/messages';
import LocaleToggle from 'containers/LocaleToggle';

function Navbar() {
  return (
    <div className="navbar">
      <Header className="d-flex w-100 headers">
        <div className="container-fluid d-flex w-100">
          <div className="logos"> Truthy</div>
          <ul className="header-main ml-auto">
            <li>
              <NavLink className="login-form-forgot" to="/">
                <FormattedMessage {...messages.home} />
              </NavLink>
            </li>
            <li>
              <NavLink className="login-form-forgot" to="/login">
                <FormattedMessage {...messages.login} />
              </NavLink>
            </li>
            <li>
              <LocaleToggle />
            </li>
          </ul>
        </div>
      </Header>
    </div>
  );
}

export default Navbar;
