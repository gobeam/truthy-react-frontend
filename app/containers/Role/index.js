/**
 *
 * Role Module
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Role/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/Role/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/Role/messages';
import {
  makeIdSelector,
  makeIsLoadingSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/Role/selectors';
import {
  deleteItemByIdAction,
  getRoleByIdAction,
  queryPermissionListAction,
  queryRolesAction,
  setFormMethodAction,
  setIdAction,
  setKeywordsAction,
} from 'containers/Role/actions';
import SearchInput from 'components/SearchInput';
import CreateRoleModal from 'containers/Role/createRoleModal';
import EditRoleModal from 'containers/Role/editRoleModal';
import RoleTable from 'containers/Role/roleTable';
import { POST, PUT } from 'utils/constants';
import ModifyPermissionModal from 'containers/Role/modifyPermissionModal';
import { Breadcrumb, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { checkPermissionForComponent } from 'utils/permission';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { PlusOutlined } from '@ant-design/icons';

const key = 'role';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  limit: makeLimitSelector(),
  isLoading: makeIsLoadingSelector(),
  id: makeIdSelector(),
  user: makeLoggedInUserSelector(),
});
const CreateRoutePermission = {
  resource: 'role',
  method: POST,
  path: '/roles',
};

export default function Role() {
  const dispatch = useDispatch();
  const { pageNumber, limit, isLoading, id, user } = useSelector(stateSelector);
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
      dispatch(getRoleByIdAction());
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
        <div className="d-flex align-items-center">
          <div>
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
      />
      <EditRoleModal visible={editRole} onCancel={() => setEditRole(false)} />
      <ModifyPermissionModal
        visible={modifyPermission}
        onCancel={() => setModifyPermission(false)}
      />
    </div>
  );
}
