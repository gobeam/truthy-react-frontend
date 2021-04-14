/*
 *
 * UserAccountPage actions
 *
 */

import {
  CHANGE_FIELD,
  GET_USER_DETAIL,
  QUERY_USER_FEED,
  QUERY_USER_TODO,
} from 'containers/UserAccountPage/constants';

/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */

export function changeFieldAction(key, val) {
  return {
    type: CHANGE_FIELD,
    key,
    val,
  };
}

export function queryUserTodoAction() {
  return {
    type: QUERY_USER_TODO,
  };
}

export function queryUserFeedAction() {
  return {
    type: QUERY_USER_FEED,
  };
}

export function getUserDetailAction() {
  return {
    type: GET_USER_DETAIL,
  };
}
