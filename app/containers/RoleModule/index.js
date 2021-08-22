/**
 *
 * Role Module
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/RoleModule/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/RoleModule/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/RoleModule/messages';
import {
  makeIdSelector,
  makeIsLoadingSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/RoleModule/selectors';
import {
  deleteItemByIdAction,
  getRoleByIdAction,
  queryPermissionListAction,
  queryRolesAction,
  setFormMethodAction,
  setIdAction,
  setKeywordsAction,
} from 'containers/RoleModule/actions';
import SearchInput from 'components/SearchInput';
import CreateRoleModal from 'containers/RoleModule/createRoleModal';
import EditRoleModal from 'containers/RoleModule/editRoleModal';
import RoleTable from 'containers/RoleModule/roleTable';
import { POST, PUT } from 'utils/constants';
import ModifyPermissionModal from 'containers/RoleModule/modifyPermissionModal';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

const key = 'roleModule';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  limit: makeLimitSelector(),
  isLoading: makeIsLoadingSelector(),
  id: makeIdSelector(),
});

export default function RoleModule() {
  const dispatch = useDispatch();
  const { pageNumber, limit, isLoading, id } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [createRole, setCreateRole] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [modifyPermission, setModifyPermission] = useState(false);

  const loadRoles = () => dispatch(queryRolesAction());
  const loadPermissionList = () => dispatch(queryPermissionListAction());
  const onKeywordChange = (keywords) =>
    dispatch(setKeywordsAction(keywords)) && loadRoles();
  const onchangeFormMethod = (formMethod) =>
    dispatch(setFormMethodAction(formMethod));
  const onCreate = () => {
    onchangeFormMethod(POST);
    setCreateRole(true);
  };
  const onEdit = (updateId) => {
    dispatch(setIdAction(updateId));
    onchangeFormMethod(PUT);
    setEditRole(true);
  };

  const onModifyPermission = (updateId) => {
    dispatch(setIdAction(updateId));
    onchangeFormMethod(PUT);
    setModifyPermission(true);
  };

  const onDelete = (deleteId) => dispatch(deleteItemByIdAction(deleteId));

  useEffect(() => {
    if (id) {
      dispatch(getRoleByIdAction(id));
    }
  }, [id]);

  useEffect(() => {
    loadPermissionList();
  }, []);

  useEffect(() => {
    loadRoles();
  }, [pageNumber, limit]);

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
        <h2>Role</h2>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/" className="links">
              Dashboard
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="current active">Role</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="truthy-content-header">
        <div className="d-flex align-items-center">
          <div className="d-flex ml-auto search-wrap">
            <SearchInput isLoading={isLoading} onSearch={onKeywordChange} />
          </div>
        </div>
      </div>

      <div className="truthy-table ">
        <RoleTable
          onCreate={onCreate}
          onEdit={onEdit}
          onModifyPermission={onModifyPermission}
          onDelete={onDelete}
        />
      </div>
      <CreateRoleModal
        visible={createRole}
        onCancel={() => setCreateRole(false)}
        onCreate={() => setCreateRole(false)}
      />
      <EditRoleModal
        visible={editRole}
        onCancel={() => setEditRole(false)}
        onCreate={() => setEditRole(false)}
      />
      <ModifyPermissionModal
        visible={modifyPermission}
        onCancel={() => setModifyPermission(false)}
        onCreate={() => setModifyPermission(false)}
      />
    </div>
  );
}
