/**
 *
 * ProfilePage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfileAction } from 'containers/ProfilePage/actions';
import { createStructuredSelector } from 'reselect';
import { Descriptions } from 'antd';
import { makeLoggedInUserSelector } from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
});

const ViewProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(stateSelector);

  const loadProfile = () => dispatch(loadProfileAction());

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
      <Descriptions.Item label="Role">
        {user.role?.name || 'N/A'}
      </Descriptions.Item>
      <Descriptions.Item label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ViewProfile;
