import { FormattedMessage } from 'react-intl';
import messages from 'routes/messages';
import React from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  LockOutlined,
  UsergroupAddOutlined,
  MailOutlined,
} from '@ant-design/icons';

export const menuList = [
  {
    name: <FormattedMessage {...messages.dashboard} />,
    icon: <DashboardOutlined />,
    key: 'dashboard-page',
    path: '/dashboard',
    method: 'get',
    resource: 'dashboard',
    defaultPermission: true,
  },
  {
    name: <FormattedMessage {...messages.userPage} />,
    icon: <UserOutlined />,
    key: 'user-page',
    path: '/users',
    method: 'get',
    resource: 'user',
    defaultPermission: false,
  },
  {
    name: <FormattedMessage {...messages.rolePage} />,
    icon: <UsergroupAddOutlined />,
    key: 'role-page',
    path: '/roles',
    method: 'get',
    resource: 'role',
    defaultPermission: false,
  },
  {
    name: <FormattedMessage {...messages.permissionPage} />,
    icon: <LockOutlined />,
    key: 'permission-page',
    path: '/permissions',
    method: 'get',
    resource: 'permission',
    defaultPermission: false,
  },
  {
    name: <FormattedMessage {...messages.emailTemplatePage} />,
    icon: <MailOutlined />,
    key: 'email-template',
    path: '/email-templates',
    method: 'get',
    resource: 'emailTemplates',
    defaultPermission: false,
  },
];
