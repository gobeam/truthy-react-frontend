/**
 *
 * profileForm
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/UserAccountPage/saga';
import reducer from 'containers/UserAccountPage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { Button, List, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  makeErrorSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
  makeTokenListSelector,
} from 'containers/UserAccountPage/selectors';
import {
  disableTokenAction,
  queryRefreshTokenListAction,
} from 'containers/UserAccountPage/actions';
import messages from 'containers/UserAccountPage/messages';
import PropTypes from 'prop-types';
import commonMessages from 'common/messages';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const key = 'userAccount';

const stateSelector = createStructuredSelector({
  loading: makeIsLoadingSelector(),
  errors: makeErrorSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
  tokenList: makeTokenListSelector(),
});

const getParsedUserAgent = (ua) => {
  try {
    return JSON.parse(ua);
  } catch (e) {
    return {
      os: {},
      browser: {},
    };
  }
};

const ListItem = ({ item, onDelete, intl }) => {
  const ua = getParsedUserAgent(item.userAgent);
  return (
    <List.Item
      actions={[
        <Button
          type="link"
          onClick={() => {
            Modal.confirm({
              okText: intl.formatMessage(commonMessages.yesLabel),
              okType: 'danger',
              cancelText: intl.formatMessage(commonMessages.noLabel),
              icon: <ExclamationCircleOutlined />,
              title: intl.formatMessage(messages.clearToken),
              onOk: (close) => {
                onDelete(item.id);
                close();
              },
            });
          }}
        >
          Clear
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={
          <FormattedMessage
            {...messages.osDetail}
            values={{ os: ua.os.name, version: ua.os.version }}
          />
        }
        description={
          <FormattedMessage
            {...messages.browserDetail}
            values={{
              browser: ua.browser.name,
              version: ua.browser.version,
              ts: Date.parse(item.expires),
            }}
          />
        }
      />
    </List.Item>
  );
};

const LoginActivity = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const { loading, tokenList } = useSelector(stateSelector);

  const disableRefreshToken = (id) => {
    dispatch(disableTokenAction(id));
  };

  useEffect(() => {
    dispatch(queryRefreshTokenListAction());
  }, []);

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={tokenList}
      renderItem={(item) => (
        <ListItem
          item={item}
          key={item.id}
          onDelete={disableRefreshToken}
          intl={intl}
        />
      )}
    />
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LoginActivity;
