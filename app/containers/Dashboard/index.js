/**
 *
 * HomePage
 *
 */

import React, { Suspense, useEffect } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/Dashboard/saga';
import reducer from 'containers/Dashboard/reducer';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeDeviceChartSelector,
  makeIsLoadingSelector,
  makeUserStatsSelector,
  makeDeviceTypeSelector,
} from 'containers/Dashboard/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  queryUserStatsAction,
  queryDeviceAction,
  setDeviceTypeAction,
} from 'containers/Dashboard/actions';
import DeviceChart from 'containers/Dashboard/charts/deviceChart';
import messages from 'containers/Dashboard/messages';
import { useIntl } from 'react-intl';

const key = 'dashboard';

const stateSelector = createStructuredSelector({
  userStats: makeUserStatsSelector(),
  deviceType: makeDeviceTypeSelector(),
  isLoading: makeIsLoadingSelector(),
  deviceChart: makeDeviceChartSelector(),
});

export default function Dashboard() {
  const dispatch = useDispatch();
  const intl = useIntl();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { userStats, isLoading, deviceChart, deviceType } =
    useSelector(stateSelector);
  const loadUserStats = () => dispatch(queryUserStatsAction());
  const loadDeviceStats = () => dispatch(queryDeviceAction());
  const handleDeviceChange = (e) =>
    dispatch(setDeviceTypeAction(e.target.value));

  useEffect(() => {
    loadUserStats();
  }, []);

  useEffect(() => {
    loadDeviceStats();
  }, [deviceType]);

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              loading={isLoading}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UsergroupAddOutlined />}
              title={intl.formatMessage(messages.totalUser, {
                count: userStats.total,
              })}
              value={userStats.total}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              loading={isLoading}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
              title={intl.formatMessage(messages.activeUser, {
                count: userStats.active,
              })}
              value={userStats.active}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              loading={isLoading}
              valueStyle={{ color: 'red' }}
              prefix={<UserOutlined />}
              title={intl.formatMessage(messages.inActiveUser, {
                count: userStats.inactive,
              })}
              value={userStats.inactive}
            />
          </Card>
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <DeviceChart
              data={deviceChart}
              loading={isLoading}
              deviceType={deviceType}
              handleChange={handleDeviceChange}
            />
          </Suspense>
        </Col>
        {/* <Col xl={12} lg={24} md={24} sm={24} xs={24}></Col> */}
      </Row>
    </>
  );
}
