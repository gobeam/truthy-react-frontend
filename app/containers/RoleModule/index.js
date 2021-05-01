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
import RoleList from 'components/Role/List';
import {
  makeDescriptionSelector,
  makeNameSelector,
  makePageNumberSelector,
  makePermissionsSelector,
  makeRolesSelector,
} from 'containers/RoleModule/selectors';
import {
  queryRolesAction,
  setPageNumberAction,
} from 'containers/RoleModule/actions';

const key = 'roleModule';

const stateSelector = createStructuredSelector({
  roles: makeRolesSelector(),
  pageNumber: makePageNumberSelector(),
  name: makeNameSelector(),
  description: makeDescriptionSelector(),
  permissions: makePermissionsSelector(),
});

export default function RoleModule() {
  const dispatch = useDispatch();
  const loadRoles = () => dispatch(queryRolesAction());
  const setPageNumber = (pageNumber) =>
    dispatch(setPageNumberAction(pageNumber));
  const { roles, pageNumber } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadRoles();
  }, [pageNumber]);

  return (
    <>
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <RoleList roles={roles} changePage={setPageNumber} />
    </>
  );
}
