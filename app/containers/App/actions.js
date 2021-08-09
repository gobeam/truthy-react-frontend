/*
 *
 * App actions
 *
 */

import {
  ASYNC_END,
  ASYNC_START,
  AUTHENTICATE_OTP,
  CHANGE_DEVICE,
  CHANGE_FIELD,
  CHANGE_OTP_VALUE,
  GET_PROFILE_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  HIDE_HEADER,
  IS_LOGGED,
  IS_LOGGED_ERROR,
  IS_LOGGED_SUCCESS,
  LOGGED_IN,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  OTP_ERROR,
  OTP_UNVERIFIED,
  OTP_VERIFIED,
  QUERY_NOTIFICATIONS,
  REFRESH_TOKEN,
  TOGGLE_COLLAPSE,
} from 'containers/App/constants';

/**
 *
 * @param user
 * @returns {{type: string, user: *}}
 */
export function getProfileSuccessAction(user) {
  return {
    type: GET_PROFILE_SUCCESS,
    user,
  };
}

/**
 *
 * @param error
 * @returns {{type: string, error: *}}
 */
export function getProfileErrorAction(error) {
  return {
    type: GET_PROFILE_ERROR,
    error,
  };
}

/**
 *
 * @returns {{type: string}}
 */
export function getProfileAction() {
  return {
    type: GET_PROFILE_REQUEST,
  };
}

/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}

/**
 * TODO
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedSuccessAction() {
  return {
    type: IS_LOGGED_SUCCESS,
  };
}

/**
 * TODO
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedErrorAction() {
  return {
    type: IS_LOGGED_ERROR,
  };
}

/**

 * User login to the application, this is the global action
 *
 * @return {object} An action object with a type of LOGGED_IN
 */
export function loggedInAction() {
  return {
    type: LOGGED_IN,
  };
}

/**
 * Start the logout process, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGOUT
 */
export function logoutAction() {
  return {
    type: LOGOUT,
  };
}

/**
 * Dispatched when the logout process are loaded by the request saga
 *
 * @return {object} An action object with a type of LOGOUT_SUCCESS
 */
export function logoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function asyncStartAction() {
  return {
    type: ASYNC_START,
  };
}

export function authenticateOtpAction() {
  return {
    type: AUTHENTICATE_OTP,
  };
}

export function asyncEndAction() {
  return {
    type: ASYNC_END,
  };
}

export function changeOtpValueAction(otp) {
  return {
    type: CHANGE_OTP_VALUE,
    otp,
  };
}

export function refreshTokenAction() {
  return {
    type: REFRESH_TOKEN,
  };
}

export function logoutErrorAction(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}

export function queryNotificationAction() {
  return {
    type: QUERY_NOTIFICATIONS,
  };
}

export function hideHeaderAction(val) {
  return {
    type: HIDE_HEADER,
    val,
  };
}

export function changeAppFieldAction(key, val) {
  return {
    type: CHANGE_FIELD,
    key,
    val,
  };
}

export function toggleCollapseAction(toggle) {
  return {
    type: TOGGLE_COLLAPSE,
    toggle,
  };
}

export function changeDeviceAction(device) {
  return {
    type: CHANGE_DEVICE,
    device,
  };
}

export function otpVerifiedAction() {
  return {
    type: OTP_VERIFIED,
  };
}

export function otpUnVerifiedAction() {
  return {
    type: OTP_UNVERIFIED,
  };
}

export function otpCodeErrorAction() {
  return {
    type: OTP_ERROR,
  };
}
