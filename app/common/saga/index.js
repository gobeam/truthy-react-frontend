import React from 'react';
import { put } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import { enqueueAlertAction } from 'containers/AlertMessage/actions';

/**
 * show formatted error message
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
