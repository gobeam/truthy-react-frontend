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
  makeIsFormPageSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/RoleModule/selectors';
import {
  queryPermissionListAction,
  queryRolesAction,
} from 'containers/RoleModule/actions';

const key = 'roleModule';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  formPage: makeIsFormPageSelector(),
  limit: makeLimitSelector(),
});

export default function RoleModule() {
  const dispatch = useDispatch();
  const { pageNumber, formPage, limit } = useSelector(stateSelector);
  const loadRoles = () => dispatch(queryRolesAction());
  const loadPermissionList = () => dispatch(queryPermissionListAction());
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

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
      {!formPage ? <RoleList /> : <RoleForm />}
    </>
  );
}
