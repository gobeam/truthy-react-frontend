/*
 *
 * AuthProvider reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';

import {
  CHANGE_FIELD,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  HIDE_HEADER,
  IS_LOGGED_ERROR,
  IS_LOGGED_SUCCESS,
  LOGGED_IN,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  ASYNC_END,
  ASYNC_START,
  TOGGLE_COLLAPSE,
  CHANGE_DEVICE,
  OTP_VERIFIED,
  OTP_UNVERIFIED,
} from 'containers/App/constants';

const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
  ? 'MOBILE'
  : 'DESKTOP';
const collapsed = device !== 'DESKTOP';

export const initialState = {
  device,
  collapsed,
  isLoading: false,
  otpVerified: true,
  isLogged: null,
  errors: {},
  user: {},
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors[action.key] = '';
      draft.isLoading = false;
      break;
    case CHANGE_DEVICE:
      draft.device = action.device;
      break;
    case OTP_VERIFIED:
      draft.otpVerified = true;
      break;
    case OTP_UNVERIFIED:
      draft.otpVerified = false;
      break;
    case TOGGLE_COLLAPSE:
      draft.collapsed = action.toggle;
      break;
    case LOGGED_IN:
    case IS_LOGGED_SUCCESS:
      draft.isLogged = true;
      break;
    case HIDE_HEADER:
      draft.hideHeader = action.val;
      break;
    case IS_LOGGED_ERROR:
      draft.isLogged = false;
      draft.otpVerified = true;
      break;
    case GET_PROFILE_SUCCESS:
      draft.user = action.user;
      break;
    case GET_PROFILE_ERROR:
      draft.error = action.error;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case LOGOUT:
    case LOGOUT_SUCCESS:
    case LOGOUT_ERROR:
      draft.erros = {};
      draft.error = '';
      draft.user = {};
      draft.isLogged = false;
      break;
    default:
  }
}, initialState);

export default appPageReducer;
