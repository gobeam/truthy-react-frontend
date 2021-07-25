import React from 'react';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import VerifyAccountPage from 'containers/VerifyAccountPage/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import UserAccountPage from 'containers/UserAccountPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import RoleModule from 'containers/RoleModule/Loadable';
import EmailTemplateModule from 'containers/EmailTemplateModule/Loadable';
import UserModule from 'containers/UserModule/Loadable';
import PermissionModule from 'containers/PermissionModule/Loadable';
import Layout from 'components/Layout';
import PrivateRoute from 'containers/PrivateRoute';
import PublicRoute from 'containers/PublicRoute';
import { useRoutes } from 'react-router-dom';

const routes = [
  {
    path: 'login',
    element: <PublicRoute element={<LoginPage />} />,
  },
  {
    path: 'register',
    element: <PublicRoute element={<RegisterPage />} />,
  },
  {
    path: 'forgot-password',
    element: <PublicRoute element={<ForgotPassword />} />,
  },
  {
    path: 'reset/:code',
    element: <PublicRoute element={<ResetPasswordPage />} />,
  },
  {
    path: 'verify/:code',
    element: <PublicRoute element={<VerifyAccountPage />} />,
  },
  {
    path: '/',
    element: <PublicRoute element={<HomePage />} />,
  },
  {
    path: '',
    element: (
      <PrivateRoute
        element={<Layout />}
        method="get"
        resource="root"
        defaultPermission
      />
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <PrivateRoute
            element={<DashboardPage />}
            method="get"
            resource="dashboard"
            defaultPermission
          />
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute
            element={<UserModule />}
            path="/users"
            method="get"
            resource="user"
            defaultPermission={false}
          />
        ),
      },
      {
        path: 'roles',
        element: (
          <PrivateRoute
            element={<RoleModule />}
            path="/roles"
            method="get"
            resource="role"
            defaultPermission={false}
          />
        ),
      },
      {
        path: 'permissions',
        element: (
          <PrivateRoute
            element={<PermissionModule />}
            path="/permissions"
            method="get"
            resource="permission"
            defaultPermission={false}
          />
        ),
      },
      {
        path: 'email-templates',
        element: (
          <PrivateRoute
            element={<EmailTemplateModule />}
            path="/email-templates"
            method="get"
            resource="emailTemplates"
            defaultPermission={false}
          />
        ),
      },
      {
        path: 'account-setting',
        element: (
          <PrivateRoute
            element={<UserAccountPage />}
            path="/account-setting"
            method="get"
            resource="user"
            defaultPermission
          />
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute
            element={<ProfilePage />}
            path="/profile"
            method="get"
            resource="user"
            defaultPermission
          />
        ),
      },
    ],
  },
];

const RenderRouter = () => useRoutes(routes);

export default RenderRouter;
