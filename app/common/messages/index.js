/**
 * Common Messages
 */

import { defineMessages } from 'react-intl';

export const scope = 'common.messages';

export default defineMessages({
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Success',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error',
  },
  warning: {
    id: `${scope}.warning`,
    defaultMessage: 'Warning',
  },
  info: {
    id: `${scope}.info`,
    defaultMessage: 'Info',
  },
  primary: {
    id: `${scope}.primary`,
    defaultMessage: 'Message',
  },
  invalidRefresh: {
    id: `${scope}.invalidRefresh`,
    defaultMessage: 'Session out',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
  complete: {
    id: `${scope}.complete`,
    defaultMessage: 'Complete',
  },
  sourceCode: {
    id: `${scope}.sourceCode`,
    defaultMessage: 'Source Code',
  },
  hideCode: {
    id: `${scope}.hideCode`,
    defaultMessage: 'Hide Code',
  },
  showCode: {
    id: `${scope}.showCode`,
    defaultMessage: 'Show Code',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  okLabel: {
    id: `${scope}.okLabel`,
    defaultMessage: 'Ok',
  },
  unauthorized: {
    id: `${scope}.unauthorized`,
    defaultMessage: `Invalid credentials`,
  },
  forbidden: {
    id: `${scope}.forbidden`,
    defaultMessage: `You don't have access for this action, please contact admin for further details.`,
  },
  editLabel: {
    id: `${scope}.editLabel`,
    defaultMessage: `Edit`,
  },
  modifyPermission: {
    id: `${scope}.modifyPermission`,
    defaultMessage: `Modify Permission`,
  },
  viewLabel: {
    id: `${scope}.viewLabel`,
    defaultMessage: `View`,
  },
  removeLabel: {
    id: `${scope}.removeLabel`,
    defaultMessage: `Remove`,
  },
  addSuccess: {
    id: `${scope}.addSuccess`,
    defaultMessage: `Data added successfully!`,
  },
  pagination: {
    id: `${scope}.pagination`,
    defaultMessage: `showing {start} to {end} of {total}`,
  },
  updateSuccess: {
    id: `${scope}.updateSuccess`,
    defaultMessage: `Data updated successfully!`,
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please try again in a moment!',
  },
  weakPassword: {
    id: `${scope}.weakPassword`,
    defaultMessage:
      'Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character and should be minimum 6 characters and maximum upto 20 characters!!',
  },
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Name',
  },
  namePlaceHolder: {
    id: `${scope}.namePlaceHolder`,
    defaultMessage: 'Input your name!',
  },
  usernamePlaceHolder: {
    id: `${scope}.usernamePlaceHolder`,
    defaultMessage: 'Input your username!',
  },
  usernameLabel: {
    id: `${scope}.usernameLabel`,
    defaultMessage: 'Username',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'Email',
  },
  emailPlaceHolder: {
    id: `${scope}.emailPlaceHolder`,
    defaultMessage: 'user@tryuthy.com',
  },
  confirmPasswordLabel: {
    id: `${scope}.confirmPasswordLabel`,
    defaultMessage: 'Confirm Password',
  },
  passwordPlaceHolder: {
    id: `${scope}.passwordPlaceHolder`,
    defaultMessage: 'Password',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Please input your email!',
  },
  validEmailRequired: {
    id: `${scope}.validEmailRequired`,
    defaultMessage: 'Invalid email!',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Please input your password!',
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'Please input your username!',
  },
  nameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'Please input your name!',
  },
  confirmPasswordRequired: {
    id: `${scope}.confirmPasswordRequired`,
    defaultMessage: 'Please confirm your password!',
  },
  confirmPasswordMatchError: {
    id: `${scope}.confirmPasswordMatchError`,
    defaultMessage: 'Confirm password does not match your password!',
  },
  confirmationMessage: {
    id: `${scope}.confirmationMessage`,
    defaultMessage: 'Are you sure you want to delete?',
  },
  emptyPermissionError: {
    id: `${scope}.emptyPermissionError`,
    defaultMessage: 'Please select some permissions to update or cancel!',
  },
  deleteSuccess: {
    id: `${scope}.deleteSuccess`,
    defaultMessage: 'Data deleted successfully!',
  },
  deleteError: {
    id: `${scope}.deleteError`,
    defaultMessage: 'Could not delete data, try again later!',
  },
  syncSuccess: {
    id: `${scope}.syncSuccess`,
    defaultMessage: 'Synchronise successful!',
  },
  yesLabel: {
    id: `${scope}.yesLabel`,
    defaultMessage: 'Yes',
  },
  noLabel: {
    id: `${scope}.noLabel`,
    defaultMessage: 'No',
  },
  otpVerificationSuccess: {
    id: `${scope}.otpVerificationSuccess`,
    defaultMessage: 'OTP code verified successfully!',
  },
  otpGenerateSuccess: {
    id: `${scope}.otpGenerateSuccess`,
    defaultMessage: 'OTP code generated successfully!',
  },
  otpLabel: {
    id: `${scope}.otpLabel`,
    defaultMessage: 'One Time Password Verification',
  },
  generateOtp: {
    id: `${scope}.generateOtp`,
    defaultMessage: 'Generate OTP',
  },
  validateLabel: {
    id: `${scope}.validateLabel`,
    defaultMessage: 'Validate',
  },
});
