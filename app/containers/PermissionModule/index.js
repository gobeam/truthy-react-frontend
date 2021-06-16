/**
 *
 * PermissionModule
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/PermissionModule/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/PermissionModule/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/PermissionModule/messages';
import PermissionList from 'components/PermissionPage/List';
import PermissionForm from 'components/PermissionPage/Form';
import {
  makeIsFormPageSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/PermissionModule/selectors';
import { queryPermissionAction } from 'containers/PermissionModule/actions';

const key = 'permissionModule';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  formPage: makeIsFormPageSelector(),
  limit: makeLimitSelector(),
});

const PermissionModule = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { pageNumber, formPage, limit } = useSelector(stateSelector);
  const loadPermissions = () => dispatch(queryPermissionAction());

  useEffect(() => {
    loadPermissions();
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
      {!formPage ? <PermissionList /> : <PermissionForm />}
    </>
  );
};

export default PermissionModule;
