/*
 *
 * HomePage actions
 *
 */

import {
  IS_LOGGED,
  ASYNC_START,
  ASYNC_END,
  SET_CONTRIBUTORS,
  GET_CONTRIBUTORS,
} from 'containers/HomePage/constants';

export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}

export function asyncStartAction() {
  return {
    type: ASYNC_START,
  };
}

export function asyncEndAction() {
  return {
    type: ASYNC_END,
  };
}

export function setContributorAction(contributors) {
  return {
    type: SET_CONTRIBUTORS,
    contributors,
  };
}

export function getContributorAction() {
  return {
    type: GET_CONTRIBUTORS,
  };
}
