import {
  ALERT_UNMOUNT,
  AUTO_DISMISS_ALERT,
  CLEAR_ALERT,
  SHOW_ALERT_MESSAGE,
} from 'containers/AlertMessage/constants';

/**
 * Enqueue alert on the screen
 * @param  {object} alert payload
 *
 */

export function enqueueAlertAction(alert) {
  return {
    type: SHOW_ALERT_MESSAGE,
    alert,
  };
}

/**
 * Remove alert from the screen
 *
 * @return {object} An action object with a type of CLEAR_ALERT
 */
export function clearAlertAction() {
  return {
    type: CLEAR_ALERT,
  };
}

export function autoDismissAlertAction() {
  return {
    type: AUTO_DISMISS_ALERT,
  };
}

export function alertUnmountAction() {
  return {
    type: ALERT_UNMOUNT,
  };
}
