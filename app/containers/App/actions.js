/*
 *
 * App actions
 *
 */

import {
  CHANGE_FIELD,
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
  PUBLIC_REDIRECT_LOGGED,
  QUERY_NOTIFICATIONS,
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

export function publicRedirectLoggedAction() {
  return {
    type: PUBLIC_REDIRECT_LOGGED,
  };
}
