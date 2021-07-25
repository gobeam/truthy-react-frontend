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
 * show error message
 * @param type
 * @param message
 * @param translate
 * @returns {IterableIterator<*>}
 */
export function* showMessage(type, message, translate = false) {
  return yield put(
    enqueueSnackMessageAction({
      message,
      type,
      translate,
    }),
  );
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
