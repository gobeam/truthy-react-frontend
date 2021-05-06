import React from 'react';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import VerifyAccountPage from 'containers/VerifyAccountPage/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import UserAccountPage from 'containers/UserAccountPage/Loadable';
import AuthRedirectPage from 'containers/AuthRedirectPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import RoleModule from 'containers/RoleModule/Loadable';
import PermissionModule from 'containers/PermissionModule/Loadable';
import messages from 'routes/messages';
import {
  faDigitalTachograph,
  faUserTag,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';

export const publicRoutes = [
  {
    key: 'home-page',
    name: 'Home',
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    key: 'login-page',
    name: 'Login',
    path: '/login',
    component: LoginPage,
    exact: true,
  },
  {
    key: 'auth-redirect-page',
    name: 'Auth Redirect',
    path: '/redirect/auth',
    component: AuthRedirectPage,
    exact: true,
  },
  {
    key: 'register-page',
    name: 'Register',
    path: '/register',
    component: RegisterPage,
    exact: true,
  },
  {
    key: 'forgot-password-page',
    name: 'Forgot Password',
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
  },
  {
    key: 'reset-code-page',
    name: 'Reset Password',
    path: '/reset/:code',
    component: ResetPasswordPage,
    exact: true,
  },
  {
    key: 'verify-account-page',
    name: 'Verify Account',
    path: '/verify/:code',
    includeNav: false,
    component: VerifyAccountPage,
    exact: true,
  },
];

export const privateRoutes = [
  {
    key: 'dashboard-page',
    name: <FormattedMessage {...messages.dashboard} />,
    icon: faDigitalTachograph,
    path: '/dashboard',
    method: 'get',
    resource: 'dashboard',
    component: DashboardPage,
    exact: true,
    defaultPermission: true,
    includeSideBar: true,
  },
  {
    key: 'role-page',
    name: <FormattedMessage {...messages.rolePage} />,
    icon: faUserTag,
    path: '/roles',
    method: 'get',
    resource: 'role',
    component: RoleModule,
    exact: true,
    defaultPermission: false,
    includeSideBar: true,
  },
  {
    key: 'permission-page',
    name: <FormattedMessage {...messages.permissionPage} />,
    icon: faUserLock,
    path: '/permissions',
    method: 'get',
    resource: 'permission',
    component: PermissionModule,
    exact: true,
    defaultPermission: false,
    includeSideBar: true,
  },
  {
    key: 'profile-page',
    name: 'Profile',
    path: '/user/:account',
    method: 'get',
    resource: 'user',
    component: UserAccountPage,
    includeSideBar: false,
    defaultPermission: false,
    exact: true,
  },
  {
    key: 'update-profile-page',
    name: 'Update Profile',
    path: '/profile',
    method: 'get',
    resource: 'user',
    component: ProfilePage,
    includeSideBar: false,
    defaultPermission: false,
    exact: true,
  },
];

export function getSideBarComponentData() {
  return privateRoutes.filter((route) => route.includeSideBar);
}
