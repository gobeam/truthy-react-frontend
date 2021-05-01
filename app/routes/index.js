import React from 'react';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import VerifyAccountPage from 'containers/VerifyAccountPage/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import UserAccountPage from 'containers/UserAccountPage/Loadable';
import AuthRedirectPage from 'containers/AuthRedirectPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import RoleModule from 'containers/RoleModule/Loadable';
import messages from 'routes/messages';
import {
  faDigitalTachograph,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';

export const publicRoutes = [
  {
    key: 'login-page',
    name: 'Login',
    path: '/',
    component: LoginPage,
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
    path: '/dashboard',
    icon: faDigitalTachograph,
    method: 'get',
    resource: 'dashboard',
    component: DashboardPage,
    includeSideBar: true,
    exact: true,
  },
  {
    key: 'role-page',
    name: <FormattedMessage {...messages.rolePage} />,
    path: '/roles',
    icon: faUserTag,
    method: 'get',
    resource: 'role',
    component: RoleModule,
    includeSideBar: true,
    exact: true,
  },
  {
    key: 'profile-page',
    name: 'Profile',
    path: '/user/:account',
    method: 'get',
    resource: 'user',
    component: UserAccountPage,
    includeSideBar: false,
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
    exact: true,
  },
];

export function getSideBarComponentData() {
  return privateRoutes.filter((route) => route.includeSideBar);
}
