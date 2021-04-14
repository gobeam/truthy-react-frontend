import {
  CLEAR_SNACKBAR,
  REMOVE_SNACKBAR,
  SHOW_SNACK_BAR_MESSAGE,
} from 'containers/SnackBar/constants';

/**
 * Enqueue snackbar on the screen
 * @param  {object} snackbar The snackbar
 *
 * @return {object} An action object with a type of TOGGLE_NOTIFICATIONS
 */

export function enqueueSnackbarAction(snackbar) {
  return {
    type: SHOW_SNACK_BAR_MESSAGE,
    snackbar,
  };
}

/**
 * Remove snackbar from the screen
 *
 * @return {object} An action object with a type of REMOVE_SNACKBAR
 */
export function clearSnackbarAction() {
  return {
    type: CLEAR_SNACKBAR,
  };
}

/**
 *
 * @returns {{type: string}}
 */
export function removeProcessSnackbarAction() {
  return {
    type: REMOVE_SNACKBAR,
  };
}
