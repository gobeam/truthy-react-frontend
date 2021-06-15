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
import UserList from 'components/UserPage/List';
import UserForm from 'components/UserPage/Form';
import {
  makeIsFormPageSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/UserModule/selectors';
import {
  queryRolesListAction,
  queryUsersAction,
} from 'containers/UserModule/actions';

const key = 'userModule';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  formPage: makeIsFormPageSelector(),
  limit: makeLimitSelector(),
});

const UserModule = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { pageNumber, formPage, limit } = useSelector(stateSelector);
  const loadUsers = () => dispatch(queryUsersAction());
  const loadRoles = () => dispatch(queryRolesListAction());

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    loadUsers();
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
      {!formPage ? <UserList /> : <UserForm />}
    </>
  );
};

export default UserModule;
