/**
 *
 * Profile
 *
 */

import React from 'react';
import { Button, Descriptions } from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { useSelector } from 'react-redux';
import messages from 'containers/Profile/messages';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { BASE_URL } from 'utils/api';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import { useNavigate } from 'react-router-dom';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
});

function Profile() {
  const { user } = useSelector(stateSelector);
  const navigate = useNavigate();
  return (
    <>
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <div className="truthy-table profile-details-card">
        <PageHeaderWrapper
          title={messages.pageHeader}
          avatar={
            user.avatar ? { src: `${BASE_URL}/images/profile/${user.avatar}` } : null
          }
          extra={[
            <Button key="3" onClick={() => navigate('/account-setting')}>
              <FormattedMessage {...messages.editProfileLabel} />
            </Button>,
          ]}
        />
        <Descriptions>
          <Descriptions.Item label="UserName">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {user.role?.name || <FormattedMessage {...messages.na} />}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Contact">
            {user.contact || <FormattedMessage {...messages.na} />}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {user.address || <FormattedMessage {...messages.na} />}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
}

export default Profile;
