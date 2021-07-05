import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from 'containers/UserModule/messages';
import commonMessages from 'common/messages';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPageNumberAction,
  setPageSizeAction,
} from 'containers/UserModule/actions';
import { Button, Table, Tag } from 'antd';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoadingSelector,
  makeRolesListSelector,
  makeUsersSelector,
} from 'containers/UserModule/selectors';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { checkPermissionForComponent } from 'utils/permission';
import PropTypes from 'prop-types';

const stateSelector = createStructuredSelector({
  isLoading: makeIsLoadingSelector(),
  users: makeUsersSelector(),
  roles: makeRolesListSelector(),
  user: makeLoggedInUserSelector(),
});

function UserTable(props) {
  const { intl } = props;
  const { users, user } = useSelector(stateSelector);
  const dispatch = useDispatch();

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
    total: users.totalItems,
    showTotal: (total, range) => (
      <FormattedMessage
        {...commonMessages.pagination}
        values={{ start: range[0], end: range[1], total }}
      />
    ),
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'blocked':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <>
      <Table
        pagination={paginationOptions}
        rowKey="id"
        dataSource={users.results}
        scroll={{ x: 500 }}
        title={() => (
          <Button
            type="primary"
            onClick={() => ''}
            disabled={
              !checkPermissionForComponent(user.role, {
                resource: 'user',
                method: 'post',
                path: '/users',
              })
            }
          >
            <FormattedMessage {...messages.addLabel} />
          </Button>
        )}
      >
        <Table.Column
          title={intl.formatMessage(messages.nameLabel)}
          dataIndex="name"
          width={100}
          render={(_, { name }) => name}
        />
        <Table.Column
          title={intl.formatMessage(messages.emailLabel)}
          dataIndex="email"
          key="email"
          width={100}
        />
        <Table.Column
          title={intl.formatMessage(messages.usernameLabel)}
          dataIndex="username"
          key="username"
          width={100}
        />
        <Table.Column
          title={intl.formatMessage(messages.statusLabel)}
          dataIndex="status"
          key="status"
          render={(_, { status }) => (
            <Tag color={getStatusClass(status)}>{status}</Tag>
          )}
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
          align="center"
          render={() => [
            <Button
              type="link"
              key="1"
              disabled={
                !checkPermissionForComponent(user.role, {
                  resource: 'user',
                  method: 'put',
                  path: '/users/:id',
                })
              }
            >
              <FormattedMessage {...messages.addLabel} />
            </Button>,
          ]}
        />
      </Table>
    </>
  );
}

UserTable.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(UserTable);
