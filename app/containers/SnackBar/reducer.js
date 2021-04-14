/*
 *
 * App reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';

import {
  SHOW_SNACK_BAR_MESSAGE,
  CLEAR_SNACKBAR,
} from 'containers/SnackBar/constants';

export const initialState = {
  show: false,
  message: '',
  type: '',
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
  switch (action.type) {
    case SHOW_SNACK_BAR_MESSAGE:
      draft.show = true;
      draft.message = action.snackbar.message;
      draft.duration = action.snackbar.duration;
      draft.type = action.snackbar.type;
      break;
    case CLEAR_SNACKBAR:
      draft.show = false;
      draft.message = '';
      draft.duration = 0;
      draft.type = '';
      break;
    default:
  }
}, initialState);

export default appPageReducer;
