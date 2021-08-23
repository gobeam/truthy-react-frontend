/*
 *
 * Dashboard actions
 *
 */

import {
  QUERY_USER_STATS,
  SET_USER_STATS,
  ASYNC_START,
  ASYNC_END,
} from 'containers/Dashboard/constants';

export function queryUserStatsAction() {
  return {
    type: QUERY_USER_STATS,
  };
}

export function setUserStatsAction(stats) {
  return {
    type: SET_USER_STATS,
    stats,
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
