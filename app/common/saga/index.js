import React from 'react';
import { put } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import { enqueueAlertAction } from 'containers/AlertMessage/actions';
import { enqueueSnackMessageAction } from 'containers/SnackMessage/actions';

/**
 * show formatted error alert
 * @param type
 * @param message
 * @returns {IterableIterator<*>}
 */
export function* showFormattedAlert(type, message) {
  return yield put(
    enqueueAlertAction({
      message: <FormattedMessage {...message} />,
      type,
    }),
  );
}

/**
 * show formatted snack message
 * @param payload: {type: string, message: string, translate: boolean, id: string}
 * @returns {IterableIterator<*>}
 */
export function* showMessage(payload) {
  return yield put(enqueueSnackMessageAction(payload));
}

/**
 * show error alert
 * @param type
 * @param message
 * @returns {IterableIterator<*>}
 */
export function* showAlert(type, message) {
  return yield put(
    enqueueAlertAction({
      message,
      type,
    }),
  );
}
