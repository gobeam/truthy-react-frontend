import React from 'react';
import { put } from 'redux-saga/effects';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import { FormattedMessage } from 'react-intl';

/**
 * show formatted error message
 * @param type
 * @param message
 * @param autoHide
 * @returns {IterableIterator<*>}
 */
export function* showFormattedErrorMessage(type, message, autoHide = true) {
  return yield put(
    enqueueSnackbarAction({
      message: <FormattedMessage {...message} />,
      type,
      autoHide,
    }),
  );
}

/**
 * show error message
 * @param type
 * @param message
 * @param autoHide
 * @returns {IterableIterator<*>}
 */
export function* showErrorMessage(type, message, autoHide = true) {
  return yield put(
    enqueueSnackbarAction({
      message,
      type,
      autoHide,
    }),
  );
}
