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
  makeDescriptionSelector,
  makeIsFormPageSelector,
  makeLimitSelector,
  makePageNumberSelector,
  makePermissionsSelector,
} from 'containers/PermissionModule/selectors';
import {
  changeFieldAction,
  queryPermissionAction,
  setPageNumberAction,
} from 'containers/PermissionModule/actions';
import { makeLoggedInUserSelector } from 'containers/App/selectors';

const key = 'permissionModule';

const stateSelector = createStructuredSelector({
  permissions: makePermissionsSelector(),
  pageNumber: makePageNumberSelector(),
  description: makeDescriptionSelector(),
  user: makeLoggedInUserSelector(),
  formPage: makeIsFormPageSelector(),
  limit: makeLimitSelector(),
});

const PermissionModule = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { permissions, pageNumber, user, formPage, limit } = useSelector(
    stateSelector,
  );
  const onChangeField = (keyName, value) =>
    dispatch(changeFieldAction(keyName, value));
  const loadPermissions = () => dispatch(queryPermissionAction());

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
      {!formPage ? (
        <PermissionList
          user={user}
          limit={limit}
          loadPermissions={loadPermissions}
          permissions={permissions}
          changePage={setPageNumber}
          togglePageOn={togglePageOn}
        />
      ) : (
        <PermissionForm />
      )}
    </>
  );
};

export default PermissionModule;
