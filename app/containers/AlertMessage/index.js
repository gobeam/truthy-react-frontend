/**
 *
 * Alert Message
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/AlertMessage/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/AlertMessage/saga';
import commonMessage from 'common/messages';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  makeAlertMessageSelector,
  makeAlertMessageTypeSelector,
  makeAlertShowSelector,
  makeIdSelector,
} from 'containers/AlertMessage/selectors';
import { Alert } from 'antd';
import { autoDismissAlertAction } from 'containers/AlertMessage/actions';

const key = 'alertMessage';

const stateSelector = createStructuredSelector({
  message: makeAlertMessageSelector(),
  show: makeAlertShowSelector(),
  type: makeAlertMessageTypeSelector(),
  id: makeIdSelector(),
});

export default function AlertMessage() {
  const dispatch = useDispatch();

  const autoDismiss = () => dispatch(autoDismissAlertAction());

  useInjectReducer({ key, reducer });

  useInjectSaga({ key, saga });

  const { message, type, id, show } = useSelector(stateSelector);

  useEffect(() => {
    if (message !== '') {
      autoDismiss();
    }
  }, [message]);

  if (!show) {
    return <></>;
  }

  return (
    <Alert
      key={id}
      message={type ? <FormattedMessage {...commonMessage[type]} /> : ''}
      description={message}
      type={type}
      showIcon
      closable
    />
  );
}
