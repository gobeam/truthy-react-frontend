/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import globalReducer from 'containers/App/reducer';
import loginPageReducer from 'containers/LoginPage/reducer';
import registerPageReducer from 'containers/RegisterPage/reducer';
import alertMessageReducer from 'containers/AlertMessage/reducer';
import snackMessageReducer from 'containers/SnackMessage/reducer';
import verifyPageReducer from 'containers/VerifyAccount/reducer';
import forgotPasswordReducer from 'containers/ForgotPassword/reducer';
import resetPasswordReducer from 'containers/ResetPassword/reducer';
import userAccountReducer from 'containers/UserAccount/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import roleReducer from 'containers/Role/reducer';
import permissionReducer from 'containers/Permission/reducer';
import usersReducer from 'containers/Users/reducer';
import DashboardReducer from 'containers/Dashboard/reducer';
import emailTemplateReducer from 'containers/EmailTemplate/reducer';
import homePageReducer from 'containers/HomePage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    homePage: homePageReducer,
    alertMessage: alertMessageReducer,
    snackMessage: snackMessageReducer,
    language: languageProviderReducer,
    login: loginPageReducer,
    register: registerPageReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    verifyPage: verifyPageReducer,
    userAccount: userAccountReducer,
    dashboard: DashboardReducer,
    role: roleReducer,
    permission: permissionReducer,
    users: usersReducer,
    emailTemplate: emailTemplateReducer,
    ...injectedReducers,
  });
}
