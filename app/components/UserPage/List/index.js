import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Badge, Card, Col, Row, Table } from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/UserModule/messages';
import BreadCrumbWrapper from 'components/BreadCrumbWrapper';
import TablePagination from 'components/TablePagination';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  queryUsersAction,
  setPageNumberAction,
} from 'containers/UserModule/actions';
import commonMessages from 'common/messages';
import ButtonWrapper from 'components/ButtonWrapper';
import { checkPermissionForComponent } from 'utils/permission';
import SearchInput from 'components/SearchInput';
import { createStructuredSelector } from 'reselect';
import {
  makeLimitSelector,
  makeRolesListSelector,
  makeUsersSelector,
} from 'containers/UserModule/selectors';
import { makeLoggedInUserSelector } from 'containers/App/selectors';

const breadCrumbItem = [
  {
    href: '#',
    key: 'permission-list',
    title: <FormattedMessage {...messages.listTitle} />,
  },
];

const stateSelector = createStructuredSelector({
  users: makeUsersSelector(),
  roles: makeRolesListSelector(),
  user: makeLoggedInUserSelector(),
  limit: makeLimitSelector(),
});

function UserList() {
  const { users, user, limit } = useSelector(stateSelector);
  const dispatch = useDispatch();

  const loadUsers = () => dispatch(queryUsersAction());

  const onChangeField = (keyName, value) =>
    dispatch(changeFieldAction(keyName, value));

  const togglePageOn = (method, id = null) => {
    onChangeField('formPage', true);
    onChangeField('formMethod', method);
    onChangeField('updateId', id);
    onChangeField(
      'formTitle',
      method === 'post' ? messages.addTitle : messages.editTitle,
    );
  };

  const setPageNumber = (page) => dispatch(setPageNumberAction(page));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    loadUsers();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'blocked':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <>
      <BreadCrumbWrapper
        title={<FormattedMessage {...messages.listTitle} />}
        breadCrumbItem={breadCrumbItem}
      />
      <Row className="justify-content-between align-items-center">
        <Col xs={8} md={6} lg={3} xl={4}>
          <ButtonWrapper
            type="button"
            icon={faPlus}
            variant="outline-primary"
            classname="m-1"
            handler={() => togglePageOn('post')}
            label={messages.addLabel}
          />
        </Col>
      </Row>

      <SearchInput
        limit={limit}
        onChangeField={onChangeField}
        onSubmitForm={handleSubmitForm}
      />

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">
                  <FormattedMessage {...messages.nameLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.emailLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.usernameLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.statusLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.dateLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.actionLabel} />
                </th>
              </tr>
            </thead>
            <tbody>
              {users.results && (
                <tr>
                  <td colSpan={6}>No data available</td>
                </tr>
              )}
              {users.results.map((userItem) => (
                <tr key={userItem.id}>
                  <td>
                    <span className="fw-normal">
                      {userItem.name}
                      <Badge bg="info" className="me-1">
                        {userItem.role ? userItem.role.name : ''}
                      </Badge>
                    </span>
                  </td>
                  <td>
                    <span className="fw-normal">{userItem.email}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{userItem.username}</span>
                  </td>
                  <td>
                    <span className="fw-normal">
                      <Badge
                        bg={getStatusClass(userItem.status)}
                        className="me-1 text-capitalize"
                      >
                        {userItem.status}
                      </Badge>
                    </span>
                  </td>
                  <td>
                    <span className="fw-normal">
                      <FormattedMessage
                        {...messages.createdAt}
                        values={{ ts: Date.parse(userItem.createdAt) }}
                      />
                    </span>
                  </td>
                  <td>
                    <ButtonWrapper
                      show={checkPermissionForComponent(user.role, {
                        resource: 'user',
                        method: 'put',
                        path: '/users/:id',
                      })}
                      type="button"
                      icon={faEdit}
                      variant="primary"
                      classname="m-1 btn-sm"
                      handler={() => togglePageOn('put', userItem.id)}
                      label={commonMessages.editLabel}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {users.results && users.results.length > 0 ? (
            <TablePagination
              limit={limit}
              currentPage={users.currentPage}
              pageSize={users.pageSize}
              totalItems={users.totalItems}
              previous={users.previous}
              next={users.next}
              handlePageChange={setPageNumber}
            />
          ) : (
            ''
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default UserList;
