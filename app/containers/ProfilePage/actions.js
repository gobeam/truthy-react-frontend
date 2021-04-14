/*
 *
 * HomePage actions
 *
 */

import {
  ADD_VALIDATION_ERROR,
  CHANGE_FIELD,
  LOAD_PROFILE,
  SUBMIT_PASSWORD_RESET,
  SUBMIT_PROFILE_UPDATE,
} from 'containers/ProfilePage/constants';

/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function loadProfileAction() {
  return {
    type: LOAD_PROFILE,
  };
}

export function updateProfileFormAction() {
  return {
    type: SUBMIT_PROFILE_UPDATE,
  };
}

export function resetPasswordSubmitAction() {
  return {
    type: SUBMIT_PASSWORD_RESET,
  };
}

export function changeFieldAction(key, val) {
  return {
    type: CHANGE_FIELD,
    key,
    val,
  };
}

export function enterValidationErrorAction(errors) {
  return {
    type: ADD_VALIDATION_ERROR,
    errors,
  };
}
