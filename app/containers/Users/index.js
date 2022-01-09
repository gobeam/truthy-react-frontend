/**
 *
 * Users
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Users/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/Users/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/Users/messages';
import {
  makeIdSelector,
  makeIsLoadingSelector,
  makePageNumberSelector,
  makePageSizeSelector,
} from 'containers/Users/selectors';
import {
  getUserByIdAction,
  queryRolesListAction,
  queryUsersAction,
  setFormMethodAction,
  setIdAction,
  setSearchKeywordAction,
} from 'containers/Users/actions';
import SearchInput from 'components/SearchInput';
import UserTable from 'containers/Users/userTable';
import CreateUserModal from 'containers/Users/createUserModal';
import { POST, PUT } from 'utils/constants';
import EditUserModal from 'containers/Users/editUserModal';
import { Breadcrumb, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { checkPermissionForComponent } from 'utils/permission';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { PlusOutlined } from '@ant-design/icons';

const key = 'users';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  pageSize: makePageSizeSelector(),
  isLoading: makeIsLoadingSelector(),
  id: makeIdSelector(),
  user: makeLoggedInUserSelector(),
});

const CreateRoutePermission = {
  resource: 'user',
  method: POST,
  path: '/users',
};

const Users = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [createUser, setCreateUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const { user, pageNumber, pageSize, isLoading, id } =
    useSelector(stateSelector);

  const loadUsers = () => dispatch(queryUsersAction());
  const loadRoles = () => dispatch(queryRolesListAction());
  const onKeywordChange = (keywords) =>
    dispatch(setSearchKeywordAction(keywords)) && loadUsers();
  const onchangeFormMethod = (formMethod) =>
    dispatch(setFormMethodAction(formMethod));
  const onSetId = (entityId) => dispatch(setIdAction(entityId));

  const onCreate = () => {
    onchangeFormMethod(POST);
    setCreateUser(true);
  };

  const onEdit = (updateId) => {
    onSetId(updateId);
    onchangeFormMethod(PUT);
    setEditUser(true);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getUserByIdAction());
    }
  }, [id]);

  useEffect(() => {
    loadUsers();
  }, [pageNumber, pageSize]);

  return (
    <div className="truthy-wrapper">
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <div className="truthy-breadcrumb">
        <h2>
          <FormattedMessage {...messages.listTitle} />
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/" className="links">
              <FormattedMessage {...messages.dashboardTitle} />
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="current active">
            <FormattedMessage {...messages.listTitle} />
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="truthy-content-header">
        <div className="d-flex">
          <div className="add-wrap">
            {checkPermissionForComponent(user.role, CreateRoutePermission) ? (
              <Button type="primary" onClick={onCreate}>
                <PlusOutlined /> <FormattedMessage {...messages.addLabel} />
              </Button>
            ) : null}
          </div>
          <div className="d-flex ml-auto search-wrap">
            <SearchInput isLoading={isLoading} onSearch={onKeywordChange} />
          </div>
        </div>
      </div>

      <div className="truthy-table ">
        <UserTable onCreate={onCreate} onEdit={onEdit} />
      </div>
      <CreateUserModal
        visible={createUser}
        onCancel={() => setCreateUser(false)}
      />
      <EditUserModal visible={editUser} onCancel={() => setEditUser(false)} />
    </div>
  );
};

export default Users;
