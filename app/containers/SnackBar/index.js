/**
 *
 * Notifier
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/SnackBar/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/SnackBar/saga';
import commonMessage from 'common/messages';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  makeSnackBarMessageAutoHideSelector,
  makeSnackBarMessageSelector,
  makeSnackBarMessageShowSelector,
  makeSnackBarMessageTypeSelector,
} from 'containers/SnackBar/selectors';
import { clearSnackbarAction } from 'containers/SnackBar/actions';
import { Button, Toast } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

const key = 'snackMessage';

const stateSelector = createStructuredSelector({
  message: makeSnackBarMessageSelector(),
  show: makeSnackBarMessageShowSelector(),
  type: makeSnackBarMessageTypeSelector(),
  autoHide: makeSnackBarMessageAutoHideSelector(),
});

export default function SnackBar() {
  const dispatch = useDispatch();

  const clear = () => dispatch(clearSnackbarAction());
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'danger':
      case 'warning':
        return faExclamationTriangle;
      default:
        return faInfo;
    }
  };

  useInjectReducer({ key, reducer });

  useInjectSaga({ key, saga });

  const { message, show, type, autoHide } = useSelector(stateSelector);

  return (
    <Toast
      autohide={autoHide}
      delay={5000}
      show={show}
      onClose={clear}
      style={{ position: 'absolute', top: 0, right: 0 }}
      className={`bg-${type} text-white my-3 `}
    >
      <Toast.Header className={`text-${type}`} closeButton={false}>
        <FontAwesomeIcon icon={getIcon(type)} />
        <strong className="me-auto ms-2">
          {type ? <FormattedMessage {...commonMessage[type]} /> : ''}
        </strong>
        <Button variant="close" size="xs" onClick={clear} />
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
