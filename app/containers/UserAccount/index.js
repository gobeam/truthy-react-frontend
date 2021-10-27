/**
 *
 * VerifyAccount
 *
 */

import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/UserAccount/saga';
import reducer from 'containers/UserAccount/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import { Tabs } from 'antd';
import ProfileForm from 'containers/UserAccount/profileForm';
import messages from 'containers/UserAccount/messages';
import { useIntl } from 'react-intl';
import SecurityTab from 'containers/UserAccount/securityTab';
import LoginActivity from 'containers/UserAccount/loginActivity';

const { TabPane } = Tabs;
const key = 'userAccount';

export default function UserAccount() {
  const intl = useIntl();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  return (
    <div className="profile card">
      <Tabs tabPosition="left">
        <TabPane tab={intl.formatMessage(messages.accountTab)} key="1">
          <ProfileForm />
        </TabPane>
        <TabPane tab={intl.formatMessage(messages.securityTab)} key="2">
          <SecurityTab />
        </TabPane>
        <TabPane tab={intl.formatMessage(messages.loginActivity)} key="3">
          <LoginActivity />
        </TabPane>
      </Tabs>
    </div>
  );
}
