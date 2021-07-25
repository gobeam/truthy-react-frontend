/**
 *
 * Snack Message
 *
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/SnackMessage/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/SnackMessage/saga';
import { createStructuredSelector } from 'reselect';
import {
  makeSnackMessageSelector,
  makeDurationSelector,
  makeSnackMessageTypeSelector,
  makeIdSelector,
  makeTranslateSelector,
} from 'containers/SnackMessage/selectors';
import { message } from 'antd';
import { useIntl } from 'react-intl';

const key = 'snackMessage';

const stateSelector = createStructuredSelector({
  content: makeSnackMessageSelector(),
  duration: makeDurationSelector(),
  type: makeSnackMessageTypeSelector(),
  translate: makeTranslateSelector(),
  id: makeIdSelector(),
});

export default function SnackMessage() {
  useInjectReducer({ key, reducer });

  useInjectSaga({ key, saga });
  const intl = useIntl();

  const { content, type, duration, id, translate } = useSelector(stateSelector);

  useEffect(() => {
    if (content !== '' && id !== '') {
      message[type.toLowerCase()]({
        content: translate ? intl.formatMessage(content) : content,
        duration,
        key: id,
      });
    }
  }, [id]);

  return <></>;
}
