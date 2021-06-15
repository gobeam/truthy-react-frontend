/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import LoginPageReducer from 'containers/LoginPage/reducer';
import RegisterPageReducer from 'containers/RegisterPage/reducer';
import SnackBarMessageReducer from 'containers/SnackBar/reducer';
import profileReducer from 'containers/ProfilePage/reducer';
import verifyPageReducer from 'containers/VerifyAccountPage/reducer';
import forgotPasswordReducer from 'containers/ForgotPassword/reducer';
import resetPasswordReducer from 'containers/ResetPasswordPage/reducer';
import userAccountReducer from 'containers/UserAccountPage/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import roleModuleReducer from 'containers/RoleModule/reducer';
import permissionModuleReducer from 'containers/PermissionModule/reducer';
import userModuleReducer from 'containers/UserModule/reducer';
import emailTemplateModuleReducer from 'containers/EmailTemplateModule/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    login: LoginPageReducer,
    register: RegisterPageReducer,
    profilePage: profileReducer,
    snackMessage: SnackBarMessageReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    verifyPage: verifyPageReducer,
    userAccount: userAccountReducer,
    roleModule: roleModuleReducer,
    permissionModule: permissionModuleReducer,
    userModule: userModuleReducer,
    emailTemplate: emailTemplateModuleReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}
