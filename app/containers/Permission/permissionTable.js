import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Modal, Table } from 'antd';
import commonMessages from 'common/messages';
import ToolTipButtonWrapper from 'components/ToolTipButtonWrapper';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import {
  setPageNumberAction,
  setPageSizeAction,
} from 'containers/Permission/actions';
import messages from 'containers/Permission/messages';
import {
  makeIsLoadingSelector,
  makePermissionsSelector,
} from 'containers/Permission/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DELETE, PUT } from 'utils/constants';
import { checkPermissionForComponent } from 'utils/permission';

const stateSelector = createStructuredSelector({
  isLoading: makeIsLoadingSelector(),
  permissions: makePermissionsSelector(),
  user: makeLoggedInUserSelector(),
});

// const CreateRoutePermission = {
//   resource: 'permission',
//   method: POST,
//   path: '/permissions',
// };
const EditRoutePermission = {
  resource: 'permission',
  method: PUT,
  path: '/permissions/:id',
};

const DeleteRoutePermission = {
  resource: 'permission',
  method: DELETE,
  path: '/permissions/:id',
};

function PermissionTable(props) {
  const { onEdit, onDelete } = props;
  const { permissions, user, isLoading } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const intl = useIntl();

  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      dispatch(setPageSizeAction(pageSize));
    },
    onChange: (page) => {
      dispatch(setPageNumberAction(page));
    },
    pageSizeOptions: [5, 10, 20, 30, 50, 100],
    total: permissions.totalItems,
    showTotal: (total, range) => (
      <FormattedMessage
        {...commonMessages.pagination}
        values={{ start: range[0], end: range[1], total }}
      />
    ),
  };

  return (
    <>
      <Table
        loading={isLoading}
        pagination={paginationOptions}
        rowKey="id"
        dataSource={permissions.results}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        scroll={{ x: 500 }}
      >
        <Table.Column
          title={intl.formatMessage(messages.resourceLabel)}
          dataIndex="resource"
          width={100}
          render={(_, { resource }) => resource}
        />
        <Table.Column
          title={intl.formatMessage(messages.methodLabel)}
          dataIndex="method"
          key="method"
          width={100}
        />
        <Table.Column
          title={intl.formatMessage(messages.pathLabel)}
          dataIndex="path"
          key="path"
          width={100}
        />
        <Table.Column
          title={intl.formatMessage(messages.actionLabel)}
          width={200}
          dataIndex="id"
          key="action"
          align="center"
          render={(_, { id }) => (
            <>
              {checkPermissionForComponent(user.role, EditRoutePermission) ? (
                <ToolTipButtonWrapper
                  title={commonMessages.editLabel}
                  clickEvent={() => onEdit(id)}
                >
                  <EditOutlined />
                </ToolTipButtonWrapper>
              ) : null}
              {checkPermissionForComponent(user.role, DeleteRoutePermission) ? (
                <ToolTipButtonWrapper
                  danger
                  color="#f44336"
                  title={commonMessages.removeLabel}
                  clickEvent={() => {
                    Modal.confirm({
                      okText: intl.formatMessage(commonMessages.yesLabel),
                      okType: 'danger',
                      cancelText: intl.formatMessage(commonMessages.noLabel),
                      icon: <ExclamationCircleOutlined />,
                      title: intl.formatMessage(
                        commonMessages.confirmationMessage,
                      ),
                      onOk: (close) => onDelete(id) && close(),
                    });
                  }}
                >
                  <DeleteOutlined />
                </ToolTipButtonWrapper>
              ) : null}
            </>
          )}
        />
      </Table>
    </>
  );
}

PermissionTable.propTypes = {
  // onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PermissionTable;
