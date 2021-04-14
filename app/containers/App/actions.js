/*
 *
 * App actions
 *
 */

import {
  CHANGE_FIELD,
  CHANGE_SELECTED_COMPANY,
  ELECTRON_NOTIFY_ONE_HOUR,
  ELECTRON_NOTIFY_STRETCH,
  GET_PROFILE_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_REFRESH_TOKEN_ERROR,
  HIDE_HEADER,
  IS_LOGGED,
  IS_LOGGED_ERROR,
  IS_LOGGED_SUCCESS,
  LOAD_INVOLVED_COMPANIES,
  LOAD_NOTIFICATIONS,
  LOGGED_IN,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  MARK_READ,
  NOTIFY_STRETCH,
  QUERY_NOTIFICATIONS,
  UPDATE_INVOLVED_COMPANIES,
  SUBMIT_HOURLY_REPORT,
  PUBLIC_REDIRECT_LOGGED,
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

/**
 * Dispatched when loading the new notifications fails
 *
 * @param  {object} error The error
 *
 * @return {object}      An action object with a type of LOGOUT_ERROR passing the repos
 */
export function logoutErrorAction(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}

export function loadNotificationAction(data) {
  return {
    type: LOAD_NOTIFICATIONS,
    data,
  };
}

export function queryNotificationAction() {
  return {
    type: QUERY_NOTIFICATIONS,
  };
}

export function markNotificationAsReadAction() {
  return {
    type: MARK_READ,
  };
}

export function loadInvolvedCompaniesAction() {
  return {
    type: LOAD_INVOLVED_COMPANIES,
  };
}

export function changeSelectedCompanyAction() {
  return {
    type: CHANGE_SELECTED_COMPANY,
  };
}

export function updateInvolvedCompanies(data) {
  return {
    type: UPDATE_INVOLVED_COMPANIES,
    data,
  };
}

export function hideHeaderAction(val) {
  return {
    type: HIDE_HEADER,
    val,
  };
}

export function refreshTokenErrorAction(error) {
  return {
    type: GET_REFRESH_TOKEN_ERROR,
    error,
  };
}

export function changeAppFieldAction(key, val) {
  return {
    type: CHANGE_FIELD,
    key,
    val,
  };
}

export function notifyUserStretchAction() {
  return {
    type: NOTIFY_STRETCH,
  };
}

export function electronNotifyOneHourCompletedAction() {
  return {
    type: ELECTRON_NOTIFY_ONE_HOUR,
  };
}

export function electronNotifyTakeRestAction() {
  return {
    type: ELECTRON_NOTIFY_STRETCH,
  };
}

export function submitHourlyReportAction() {
  return {
    type: SUBMIT_HOURLY_REPORT,
  };
}

export function publicRedirectLoggedAction() {
  return {
    type: PUBLIC_REDIRECT_LOGGED,
  };
}
