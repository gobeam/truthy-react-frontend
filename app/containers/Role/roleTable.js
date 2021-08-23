import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'containers/Role/messages';
import commonMessages from 'common/messages';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPageNumberAction,
  setPageSizeAction,
} from 'containers/Role/actions';
import { Button, Modal, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { checkPermissionForComponent } from 'utils/permission';
import PropTypes from 'prop-types';
import { DELETE, POST, PUT } from 'utils/constants';
import {
  makeIsLoadingSelector,
  makeRolesSelector,
} from 'containers/Role/selectors';

const stateSelector = createStructuredSelector({
  isLoading: makeIsLoadingSelector(),
  roles: makeRolesSelector(),
  user: makeLoggedInUserSelector(),
});

const CreateRoutePermission = {
  resource: 'role',
  method: POST,
  path: '/roles',
};
const EditRoutePermission = {
  resource: 'role',
  method: PUT,
  path: '/roles/:id',
};

const DeleteRoutePermission = {
  resource: 'role',
  method: DELETE,
  path: '/roles/:id',
};

function RoleTable(props) {
  const { onCreate, onEdit, onModifyPermission, onDelete } = props;
  const { roles, user, isLoading } = useSelector(stateSelector);
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
    total: roles.totalItems,
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
        dataSource={roles.results}
        scroll={{ x: 500 }}
        title={() =>
          checkPermissionForComponent(user.role, CreateRoutePermission) ? (
            <Button type="primary" onClick={onCreate}>
              <FormattedMessage {...messages.addLabel} />
            </Button>
          ) : null
        }
      >
        <Table.Column
          title={intl.formatMessage(messages.nameLabel)}
          dataIndex="name"
          width={100}
          render={(_, { name }) => name}
        />
        <Table.Column
          title={intl.formatMessage(messages.descriptionLabel)}
          dataIndex="description"
          key="description"
          width={100}
        />
        <Table.Column
          title={intl.formatMessage(messages.dateLabel)}
          dataIndex="createdAt"
          key="createdAt"
          render={(_, { createdAt }) => (
            <FormattedMessage
              {...messages.createdAt}
              values={{ ts: Date.parse(createdAt) }}
            />
          )}
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
                <>
                  <Button type="link" onClick={() => onModifyPermission(id)}>
                    <FormattedMessage {...commonMessages.modifyPermission} />
                  </Button>
                  <Button type="link" onClick={() => onEdit(id)}>
                    <FormattedMessage {...commonMessages.editLabel} />
                  </Button>
                </>
              ) : null}
              {checkPermissionForComponent(user.role, DeleteRoutePermission) ? (
                <Button
                  type="link"
                  onClick={() => {
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
                  danger
                >
                  <FormattedMessage {...commonMessages.removeLabel} />
                </Button>
              ) : null}
            </>
          )}
        />
      </Table>
    </>
  );
}

RoleTable.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModifyPermission: PropTypes.func.isRequired,
};

export default RoleTable;
