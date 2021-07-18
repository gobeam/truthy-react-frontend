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
import ReactSvg from 'assets/logo/react.svg';
import AntdSvg from 'assets/logo/antd.svg';
import { appLocales } from 'common/language/index';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TranslationOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from 'components/Header/messages';
import { changeLocaleAction } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import useCookie from 'hooks/useCookie';

const { Header } = Layout;

const stateSelector = createStructuredSelector({
  locale: makeSelectLocale(),
  user: makeLoggedInUserSelector(),
  device: makeDeviceSelector(),
  collapsed: makeCollapsedSelector(),
  isLogged: makeIsLoggedSelector(),
  isLoading: makeIsLoadingSelector(),
});

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cookie, updateCookie] = useCookie('lang', 'en');

  const { user, isLogged, device, collapsed, locale } =
    useSelector(stateSelector);
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
            onClick={() => navigate('/dashboard')}
          >
            <FormattedMessage {...messages.profile} />
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
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

  const selectLocale = ({ key }) => {
    dispatch(changeLocaleAction(key));
    // setCurrentLang(key);
    updateCookie(key, 10);
  };

  return (
    <Header className="layout-page-header">
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img
            src={ReactSvg}
            alt=""
            style={{ marginRight: collapsed ? '2px' : '20px' }}
          />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main">
        <div tabIndex={0} aria-hidden="true" onClick={toggle} role="button">
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={selectLocale}>
                {appLocales.map((lang) => (
                  <Menu.Item
                    style={{ textAlign: 'left' }}
                    disabled={locale === lang.label}
                    key={lang.label}
                  >
                    {lang.flag} {lang.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <span>
              <TranslationOutlined />
            </span>
          </Dropdown>
          {isLogged ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <span className="user-action">
                <Avatar
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                >
                  {user.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')
                    .toUpperCase()}
                </Avatar>
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
};

export default HeaderComponent;
