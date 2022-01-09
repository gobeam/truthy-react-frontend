/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  SET_DEVICE_CHART,
  UMOUNT_DASHBOARD,
  SET_USER_STATS,
  BROWSER,
  SET_DEVICE_TYPE,
} from 'containers/Dashboard/constants';

export const initialState = {
  isLoading: false,
  userStats: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  deviceChart: [],
  deviceType: BROWSER,
};

/* eslint-disable default-case, no-param-reassign */
const DashboardReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_USER_STATS:
      draft.userStats = action.stats;
      break;
    case SET_DEVICE_TYPE:
      draft.deviceType = action.deviceType;
      break;
    case SET_DEVICE_CHART:
      draft.deviceChart = action.deviceChart;
      break;
    case UMOUNT_DASHBOARD:
      draft.userStats = {
        total: 0,
        active: 0,
        inactive: 0,
      };
      draft.isLoading = false;
      break;
  }
}, initialState);

export default DashboardReducer;
