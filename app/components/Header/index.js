import React from 'react';
import { logoutAction, toggleCollapseAction } from 'containers/App/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeCollapsedSelector,
  makeDeviceSelector,
  makeIsLoadingSelector,
  makeIsLoggedSelector,
  makeLoggedInUserSelector,
} from 'containers/App/selectors';
import LongLogoSvg from 'assets/images/logo/long-logo.svg';
import ShortLogoSvg from 'assets/images/logo/short-logo.svg';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from 'components/Header/messages';
import { BASE_URL } from 'utils/api';
import LocaleToggle from 'containers/LocaleToggle';

const { Header } = Layout;

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
  device: makeDeviceSelector(),
  collapsed: makeCollapsedSelector(),
  isLogged: makeIsLoggedSelector(),
  isLoading: makeIsLoadingSelector(),
});

function HeaderComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLogged, device, collapsed } = useSelector(stateSelector);
  const onLogout = () => dispatch(logoutAction());
  const toggle = () => dispatch(toggleCollapseAction(!collapsed));

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span
            tabIndex={0}
            aria-hidden="true"
            role="button"
            onClick={() => navigate('/profile')}
          >
            <FormattedMessage {...messages.profile} />
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <SettingOutlined />
          <span
            tabIndex={0}
            aria-hidden="true"
            role="button"
            onClick={() => navigate('/account-setting')}
          >
            Account Setting
            {/* <FormattedMessage {...messages.logout} /> */}
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <span>
          <LogoutOutlined />
          <span
            tabIndex={0}
            aria-hidden="true"
            role="button"
            onClick={onLogout}
          >
            <FormattedMessage {...messages.logout} />
          </span>
        </span>
      </Menu.Item>
    </Menu>
  );

  const toLogin = () => {
    navigate('/login');
  };

  return (
    <Header className="layout-page-header">
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          {collapsed ? (
            <img src={ShortLogoSvg} alt="short-logo" />
          ) : (
            <img src={LongLogoSvg} alt="full-logo" />
          )}
        </div>
      )}
      <div className="layout-page-header-main">
        <div tabIndex={0} aria-hidden="true" onClick={toggle} role="button">
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <LocaleToggle />
          {isLogged ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <span className="user-action">
                {user.avatar ? (
                  <Avatar src={`${BASE_URL}/images/profile/${user.avatar}`} />
                ) : (
                  <Avatar
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {user?.name ||
                      'N A'
                        .split(' ')
                        .map((name) => name[0])
                        .join('')
                        .toUpperCase()}
                  </Avatar>
                )}
              </span>
            </Dropdown>
          ) : (
            <span
              aria-hidden="true"
              style={{ cursor: 'pointer' }}
              onClick={toLogin}
            >
              <FormattedMessage {...messages.login} />
            </span>
          )}
        </div>
      </div>
    </Header>
  );
}

export default HeaderComponent;
