/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  UMOUNT_DASHBOARD,
  SET_USER_STATS,
} from 'containers/Dashboard/constants';

export const initialState = {
  isLoading: false,
  userStats: {
    total: 0,
    active: 0,
    inactive: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const DashboardReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_USER_STATS:
      draft.userStats = action.stats;
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
