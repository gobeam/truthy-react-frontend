import React from 'react';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import Profile from 'containers/Profile/Loadable';
import VerifyAccount from 'containers/VerifyAccount/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import ResetPassword from 'containers/ResetPassword/Loadable';
import UserAccount from 'containers/UserAccount/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import Role from 'containers/Role/Loadable';
import EmailTemplate from 'containers/EmailTemplate/Loadable';
import Users from 'containers/Users/Loadable';
import Permission from 'containers/Permission/Loadable';
import Layout from 'components/Layout';
import PrivateRoute from 'containers/PrivateRoute';
import PublicRoute from 'containers/PublicRoute';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { useRoutes } from 'react-router-dom';

const routes = [
  {
    path: 'login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: 'register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: 'reset/:code',
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: 'verify/:code',
    element: (
      <PublicRoute>
        <VerifyAccount />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <PublicRoute>
        <HomePage />
      </PublicRoute>
    ),
  },
  {
    path: '',
    element: (
      <PrivateRoute method="get" resource="root" defaultPermission>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <PrivateRoute method="get" resource="dashboard" defaultPermission>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute
            path="/users"
            method="get"
            resource="user"
            defaultPermission={false}
          >
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: 'roles',
        element: (
          <PrivateRoute
            path="/roles"
            method="get"
            resource="role"
            defaultPermission={false}
          >
            <Role />
          </PrivateRoute>
        ),
      },
      {
        path: 'permissions',
        element: (
          <PrivateRoute
            path="/permissions"
            method="get"
            resource="permission"
            defaultPermission={false}
          >
            <Permission />
          </PrivateRoute>
        ),
      },
      {
        path: 'email-templates',
        element: (
          <PrivateRoute
            path="/email-templates"
            method="get"
            resource="emailTemplates"
            defaultPermission={false}
          >
            <EmailTemplate />
          </PrivateRoute>
        ),
      },
      {
        path: 'account-setting',
        element: (
          <PrivateRoute
            path="/account-setting"
            method="get"
            resource="user"
            defaultPermission
          >
            <UserAccount />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute
            path="/profile"
            method="get"
            resource="user"
            defaultPermission
          >
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <PublicRoute>
        <NotFoundPage />
      </PublicRoute>
    ),
  },
];

const RenderRouter = () => useRoutes(routes);

export default RenderRouter;
