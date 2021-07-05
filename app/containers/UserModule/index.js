/**
 *
 * UserModule
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/UserModule/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/UserModule/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/UserModule/messages';

import {
  makeIsFormPageSelector,
  makeIsLoadingSelector,
  makePageNumberSelector,
  makePageSizeSelector,
} from 'containers/UserModule/selectors';
import {
  changeFieldAction,
  queryRolesListAction,
  queryUsersAction,
} from 'containers/UserModule/actions';
import SearchInput from 'components/SearchInput';
import UserTable from 'containers/UserModule/userTable';

const key = 'userModule';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  formPage: makeIsFormPageSelector(),
  pageSize: makePageSizeSelector(),
  isLoading: makeIsLoadingSelector(),
});

const UserModule = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { pageNumber, pageSize, isLoading } = useSelector(stateSelector);
  const loadUsers = () => dispatch(queryUsersAction());
  const loadRoles = () => dispatch(queryRolesListAction());
  const onChangeField = (keyName, value) =>
    dispatch(changeFieldAction(keyName, value));
  const handleSubmitForm = () => loadUsers();

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [pageNumber, pageSize]);

  return (
    <>
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <SearchInput
        isLoading={isLoading}
        onChangeField={onChangeField}
        onSubmitForm={handleSubmitForm}
      />
      <UserTable />
    </>
  );
};

export default UserModule;
