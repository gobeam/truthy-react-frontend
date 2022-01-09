import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'containers/Users/messages';
import commonMessages from 'common/messages';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPageNumberAction,
  setPageSizeAction,
} from 'containers/Users/actions';
import { Table, Tag } from 'antd';
import { createStructuredSelector } from 'reselect';
import {
  makeIsLoadingSelector,
  makeUsersSelector,
} from 'containers/Users/selectors';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { checkPermissionForComponent } from 'utils/permission';
import PropTypes from 'prop-types';
import { PUT } from 'utils/constants';
import { EditOutlined } from '@ant-design/icons';
import ToolTipButtonWrapper from 'components/ToolTipButtonWrapper';

const stateSelector = createStructuredSelector({
  isLoading: makeIsLoadingSelector(),
  users: makeUsersSelector(),
  user: makeLoggedInUserSelector(),
});

// const CreateRoutePermission = {
//   resource: 'user',
//   method: POST,
//   path: '/users',
// };
const EditRoutePermission = {
  resource: 'user',
  method: PUT,
  path: '/users/:id',
};

function UserTable(props) {
  const { onEdit } = props;
  const { users, user, isLoading } = useSelector(stateSelector);
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
        loading={isLoading}
        pagination={paginationOptions}
        rowKey="id"
        dataSource={users.results}
        scroll={{ x: 500 }}
      >
        <Table.Column
          title={intl.formatMessage(commonMessages.nameLabel)}
          dataIndex="name"
          width={100}
          render={(_, { name }) => name}
        />
        <Table.Column
          title={intl.formatMessage(commonMessages.emailLabel)}
          dataIndex="email"
          key="email"
          width={100}
        />
        <Table.Column
          title={intl.formatMessage(commonMessages.usernameLabel)}
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
          dataIndex="id"
          key="action"
          align="center"
          render={(_, { id }) =>
            checkPermissionForComponent(user.role, EditRoutePermission) ? (
              <ToolTipButtonWrapper
                title={commonMessages.editLabel}
                clickEvent={() => onEdit(id)}
              >
                <EditOutlined />
              </ToolTipButtonWrapper>
            ) : null
          }
        />
      </Table>
    </>
  );
}

UserTable.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserTable;
