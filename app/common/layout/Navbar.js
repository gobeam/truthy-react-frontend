import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';
import messages from 'containers/HomePage/messages';
import LocaleToggle from 'containers/LocaleToggle';

function Navbar() {
  return (
    <div className="navbar">
      <Header
        className="d-flex w-100 headers"
        style={{ position: 'fixed', zIndex: 1, width: '100%' }}
      >
        <div className="container-fluid d-flex w-100">
          <div className="logos">
            <Link to="/">Truthy</Link>
          </div>
          <ul className="header-main ml-auto">
            <li>
              <NavLink
                to="/"
                // @ts-ignore
                exact
              >
                <FormattedMessage {...messages.home} />
              </NavLink>
            </li>
            <li>
              <NavLink className="login-btn" to="/login">
                <FormattedMessage {...messages.login} />
              </NavLink>
            </li>
            <li>
              <NavLink className="signup-btn" to="/register">
                <FormattedMessage {...messages.register} />
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
