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
  SET_DEVICE_TYPE,
  QUERY_DEVICE_STATS,
  SET_DEVICE_CHART,
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

export function setDeviceTypeAction(deviceType) {
  return {
    type: SET_DEVICE_TYPE,
    deviceType,
  };
}

export function setDeviceChartAction(deviceChart) {
  return {
    type: SET_DEVICE_CHART,
    deviceChart,
  };
}

export function queryDeviceAction() {
  return {
    type: QUERY_DEVICE_STATS,
  };
}
