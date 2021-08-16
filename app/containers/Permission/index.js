/**
 *
 * Permission
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Permission/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/Permission/saga';
import Helmet from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'containers/Permission/messages';
import {
  makeIsLoadingSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/Permission/selectors';
import {
  deleteItemByIdAction,
  queryPermissionAction,
  setFormMethodAction,
  setIdAction,
  setKeywordsAction,
  syncPermissionAction,
} from 'containers/Permission/actions';
import SearchInput from 'components/SearchInput';
import CreatePermissionModal from 'containers/Permission/createPermissionModal';
import EditPermissionModal from 'containers/Permission/editPermissionModal';
import PermissionTable from 'containers/Permission/permissionTable';
import { POST, PUT } from 'utils/constants';
import { Button, Col, Modal, Row } from 'antd';
import { ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons';

const key = 'Permission';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  limit: makeLimitSelector(),
  isLoading: makeIsLoadingSelector(),
});

const Permission = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [createPermission, setCreatePermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const { pageNumber, limit, isLoading } = useSelector(stateSelector);
  const onchangeFormMethod = (formMethod) =>
    dispatch(setFormMethodAction(formMethod));
  const loadPermissions = () => dispatch(queryPermissionAction());
  const onKeywordChange = (keywords) =>
    dispatch(setKeywordsAction(keywords)) && loadPermissions();
  const onCreate = () => {
    onchangeFormMethod(POST);
    setCreatePermission(true);
  };
  const onEdit = (updateId) => {
    dispatch(setIdAction(updateId));
    onchangeFormMethod(PUT);
    setEditPermission(true);
  };

  const onDelete = (deleteId) => dispatch(deleteItemByIdAction(deleteId));
  const onSync = () => dispatch(syncPermissionAction());

  useEffect(() => {
    loadPermissions();
  }, [pageNumber, limit]);

  return (
    <>
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Row>
        <Col span={8}>
          <SearchInput isLoading={isLoading} onSearch={onKeywordChange} />
        </Col>
        <Col span={8} offset={8}>
          <Button
            type="primary"
            icon={<SyncOutlined />}
            onClick={() => {
              Modal.confirm({
                okText: intl.formatMessage(messages.syncOk),
                okType: 'danger',
                cancelText: intl.formatMessage(messages.cancelBtn),
                icon: <ExclamationCircleOutlined />,
                title: intl.formatMessage(messages.syncConfirmationMessage),
                onOk: (close) => onSync() && close(),
              });
            }}
          >
            <FormattedMessage {...messages.syncLabel} />
          </Button>
        </Col>
      </Row>

      <CreatePermissionModal
        visible={createPermission}
        onCancel={() => setCreatePermission(false)}
        onCreate={() => setCreatePermission(false)}
      />
      <EditPermissionModal
        visible={editPermission}
        onCancel={() => setEditPermission(false)}
        onCreate={() => setEditPermission(false)}
      />
      <PermissionTable
        onCreate={onCreate}
        onEdit={onEdit}
        onModifyPermission={() => {}}
        onDelete={onDelete}
      />
    </>
  );
};

export default Permission;
