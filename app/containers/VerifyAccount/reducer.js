/*
 *
 * VerifyAccount reducer
 *
 */
import produce from 'immer';
import { SET_VERIFY_CODE } from 'containers/VerifyAccount/constants';

export const initialState = {
  verifyCode: '',
};

/* eslint-disable default-case, no-param-reassign */
const slackPageReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_VERIFY_CODE:
      draft.verifyCode = action.code;
      break;
  }
}, initialState);

export default slackPageReducer;
