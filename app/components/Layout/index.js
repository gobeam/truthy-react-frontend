import React, { Suspense, useEffect } from 'react';
import { Drawer, Layout } from 'antd';
import 'components/Layout/index.less';
import HeaderComponent from 'components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import { createStructuredSelector } from 'reselect';
import {
  makeCollapsedSelector,
  makeDeviceSelector,
  makeOtpErrorSelector,
  makeOtpVerificationSelector,
} from 'containers/App/selectors';
import { useDispatch, useSelector } from 'react-redux';
import MenuComponent from 'components/Layout/Menu';
import {
  authenticateOtpAction,
  changeDeviceAction,
  changeOtpValueAction,
  toggleCollapseAction,
} from 'containers/App/actions';
import AlertMessage from 'containers/AlertMessage';
import SnackMessage from 'containers/SnackMessage';
import OtpModal from 'components/OtpModal';

const { Sider, Content } = Layout;
const WIDTH = 992;
const OTP_LENGTH = 6;

const stateSelector = createStructuredSelector({
  device: makeDeviceSelector(),
  collapsed: makeCollapsedSelector(),
  otpError: makeOtpErrorSelector(),
  otpVerified: makeOtpVerificationSelector(),
});

const LayoutPage = () => {
  const dispatch = useDispatch();
  const { device, collapsed, otpError, otpVerified } =
    useSelector(stateSelector);
  const isMobile = device === 'MOBILE';
  const location = useLocation();
  const navigate = useNavigate();

  const onChangeOtp = (otp) => {
    dispatch(changeOtpValueAction(otp));
    if (otp.trim().length === OTP_LENGTH) {
      dispatch(authenticateOtpAction());
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  const toggle = () => dispatch(toggleCollapseAction(!collapsed));

  useEffect(() => {
    window.onresize = () => {
      const deviceType = /(iPhone|iPad|iPod|iOS|Android)/i.test(
        navigator.userAgent,
      )
        ? 'MOBILE'
        : 'DESKTOP';
      dispatch(changeDeviceAction(deviceType));
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;
      dispatch(toggleCollapseAction(needCollapse));
    };
  }, []);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="md"
          >
            <MenuComponent />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            visible={!collapsed}
          >
            <MenuComponent />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <SnackMessage />
          <AlertMessage />
          <OtpModal
            visible={!otpVerified}
            autoFocus
            length={OTP_LENGTH}
            className="otpContainer"
            inputClassName={`otpInput ${otpError ? 'shake-input' : ''}`}
            onChangeOTP={onChangeOtp}
          />
          <Suspense fallback={<LoadingIndicator />}>
            {otpVerified ? <Outlet /> : null}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
