/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/Dashboard/saga';
import reducer from 'containers/Dashboard/reducer';
import { Col, Row, Statistic } from 'antd';
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeIsLoadingSelector,
  makeUserStatsSelector,
} from 'containers/Dashboard/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { queryUserStatsAction } from 'containers/Dashboard/actions';

const key = 'dashboard';

const stateSelector = createStructuredSelector({
  userStats: makeUserStatsSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { userStats, isLoading } = useSelector(stateSelector);
  const loadUserStats = () => dispatch(queryUserStatsAction());

  useEffect(() => {
    loadUserStats();
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            loading={isLoading}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UsergroupAddOutlined />}
            title="Total Users"
            value={userStats.total}
          />
        </Col>
        <Col span={8}>
          <Statistic
            loading={isLoading}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserOutlined />}
            title="Active Users"
            value={userStats.active}
          />
        </Col>
        <Col span={8}>
          <Statistic
            loading={isLoading}
            valueStyle={{ color: 'red' }}
            prefix={<UserOutlined />}
            title="Active Users"
            value={userStats.inactive}
          />
        </Col>
      </Row>
    </>
  );
}
