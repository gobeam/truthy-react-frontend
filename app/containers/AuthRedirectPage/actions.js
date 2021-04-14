/*
 *
 * AuthRedirectPage actions
 *
 */

import {
  SET_VERIFY_CODE,
  VERIFY_VERIFY_CODE,
} from 'containers/AuthRedirectPage/constants';

export function setVerifyCodeAction(code) {
  return {
    type: SET_VERIFY_CODE,
    code,
  };
}

export function verifyVerifyCodeAction() {
  return {
    type: VERIFY_VERIFY_CODE,
  };
}
