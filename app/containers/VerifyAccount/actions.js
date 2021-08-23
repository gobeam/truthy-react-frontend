/*
 *
 * VerifyAccount actions
 *
 */

import {
  SET_VERIFY_CODE,
  VERIFY_VERIFY_CODE,
} from 'containers/VerifyAccount/constants';

/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */

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
