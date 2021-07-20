/*
 *
 * Alert Message reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';
import uuid from 'react-uuid';
import {
  SHOW_ALERT_MESSAGE,
  CLEAR_ALERT,
  ALERT_UNMOUNT,
} from 'containers/AlertMessage/constants';

export const initialState = {
  show: false,
  message: '',
  type: '',
  id: '',
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const alertReducer = produce((draft, action) => {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      draft.show = true;
      draft.message = action.alert.message;
      draft.type = action.alert.type;
      draft.id = uuid();
      break;
    case ALERT_UNMOUNT:
    case CLEAR_ALERT:
      draft.show = false;
      draft.message = '';
      draft.type = '';
      draft.id = '';
      break;
    default:
  }
}, initialState);

export default alertReducer;
