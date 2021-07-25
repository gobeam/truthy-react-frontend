/**
 *
 * VerifyAccountPage
 *
 */

import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/UserAccountPage/saga';
import reducer from 'containers/UserAccountPage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import { Tabs } from 'antd';
import ProfileForm from 'containers/UserAccountPage/profileForm';
import messages from 'containers/UserAccountPage/messages';
import { useIntl } from 'react-intl';
import SecurityTab from 'containers/UserAccountPage/securityTab';
import LoginActivity from 'containers/UserAccountPage/loginActivity';

const { TabPane } = Tabs;
const key = 'userAccount';

export default function UserAccountPage() {
  const intl = useIntl();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  return (
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
  );
}
