import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import VerifyAccountPage from 'containers/VerifyAccountPage/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import UserAccountPage from 'containers/UserAccountPage/Loadable';
import AuthRedirectPage from 'containers/AuthRedirectPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';

export const publicRoutes = [
  {
    path: '/',
    name: 'login-page',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/redirect/auth',
    name: 'redirect-page',
    component: AuthRedirectPage,
    exact: true,
  },
  {
    name: 'register-page',
    path: '/register',
    component: RegisterPage,
    exact: true,
  },
  {
    name: 'forgot-password-page',
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
  },
  {
    name: 'reset-code-page',
    path: '/reset/:code',
    component: ResetPasswordPage,
    exact: true,
  },
  {
    name: 'verify-account-page',
    path: '/verify/:code',
    includeNav: false,
    component: VerifyAccountPage,
    exact: true,
  },
];

export const privateRoutes = [
  {
    name: 'dashboard-page',
    path: '/dashboard',
    component: DashboardPage,
    exact: true,
  },
  {
    name: 'profile-page',
    path: '/user/:account',
    includeNav: false,
    component: UserAccountPage,
    exact: true,
  },
  {
    name: 'update-profile-page',
    path: '/profile',
    component: ProfilePage,
    exact: true,
  },
];
