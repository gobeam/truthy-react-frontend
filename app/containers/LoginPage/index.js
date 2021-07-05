/**
 *
 * LoginPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/LoginPage/reducer';
import LoginForm from 'components/LoginForm';
import { createStructuredSelector } from 'reselect';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { hideHeaderAction } from 'containers/App/actions';
import saga from 'containers/LoginPage/saga';
import 'containers/LoginPage/index.less';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/LoginPage/messages';

const key = 'login';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(stateSelector);
  const hideHeader = () => dispatch(hideHeaderAction(true));

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    hideHeader();
  }, [user]);

  return (
    <div className="login-page">
      <FormattedMessage {...messages.helmetLoginTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>

      <LoginForm />
    </div>
  );
}
