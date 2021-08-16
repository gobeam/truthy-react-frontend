import React from 'react';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import Profile from 'containers/Profile/Loadable';
import VerifyAccount from 'containers/VerifyAccount/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import ResetPassword from 'containers/ResetPassword/Loadable';
import UserAccount from 'containers/UserAccount/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import Role from 'containers/Role/Loadable';
import EmailTemplate from 'containers/EmailTemplate/Loadable';
import Users from 'containers/Users/Loadable';
import Permission from 'containers/Permission/Loadable';
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
    element: <PublicRoute element={<ResetPassword />} />,
  },
  {
    path: 'verify/:code',
    element: <PublicRoute element={<VerifyAccount />} />,
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
            element={<Users />}
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
            element={<Role />}
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
            element={<Permission />}
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
            element={<EmailTemplate />}
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
            element={<UserAccount />}
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
            element={<Profile />}
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
