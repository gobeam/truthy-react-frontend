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

const key = 'role';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  limit: makeLimitSelector(),
  isLoading: makeIsLoadingSelector(),
  id: makeIdSelector(),
});

export default function Role() {
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
    <>
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <SearchInput isLoading={isLoading} onSearch={onKeywordChange} />
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
      <RoleTable
        onCreate={onCreate}
        onEdit={onEdit}
        onModifyPermission={onModifyPermission}
        onDelete={onDelete}
      />
    </>
  );
}
