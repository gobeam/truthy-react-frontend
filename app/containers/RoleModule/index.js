/**
 *
 * Role Module
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/RoleModule/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/RoleModule/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/RoleModule/messages';
import RoleList from 'components/RolePage/List';
import RoleForm from 'components/RolePage/Form';
import {
  makeDescriptionSelector,
  makeIsFormPageSelector,
  makeLimitSelector,
  makeNameSelector,
  makePageNumberSelector,
  makePermissionsSelector,
  makeRolesSelector,
} from 'containers/RoleModule/selectors';
import {
  changeFieldAction,
  queryPermissionListAction,
  queryRolesAction,
  setPageNumberAction,
} from 'containers/RoleModule/actions';
import { makeLoggedInUserSelector } from 'containers/App/selectors';

const key = 'roleModule';

const stateSelector = createStructuredSelector({
  roles: makeRolesSelector(),
  pageNumber: makePageNumberSelector(),
  name: makeNameSelector(),
  description: makeDescriptionSelector(),
  permissions: makePermissionsSelector(),
  user: makeLoggedInUserSelector(),
  formPage: makeIsFormPageSelector(),
  limit: makeLimitSelector(),
});

export default function RoleModule() {
  const dispatch = useDispatch();
  const { roles, pageNumber, user, formPage, limit } =
    useSelector(stateSelector);
  const onChangeField = (keyName, value) =>
    dispatch(changeFieldAction(keyName, value));
  const loadRoles = () => dispatch(queryRolesAction());
  const loadPermissionList = () => dispatch(queryPermissionListAction());
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
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadRoles();
  }, [pageNumber, limit]);

  useEffect(() => {
    loadPermissionList();
  }, []);

  return (
    <>
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      {!formPage ? (
        <RoleList
          limit={limit}
          user={user}
          loadRoles={loadRoles}
          roles={roles}
          changePage={setPageNumber}
          togglePageOn={togglePageOn}
        />
      ) : (
        <RoleForm />
      )}
    </>
  );
}
