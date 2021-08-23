import { Drawer, Layout } from 'antd';
import HeaderComponent from 'components/Header';
import 'components/Layout/index.less';
import MenuComponent from 'components/Layout/Menu';
import LoadingIndicator from 'components/LoadingIndicator';
import OtpModal from 'components/OtpModal';
import AlertMessage from 'containers/AlertMessage';
import {
  authenticateOtpAction,
  changeDeviceAction,
  changeOtpValueAction,
  otpCodeErrorAction,
  toggleCollapseAction,
} from 'containers/App/actions';
import {
  makeCollapsedSelector,
  makeDeviceSelector,
  makeOtpErrorSelector,
  makeOtpValueSelector,
  makeOtpVerificationSelector,
} from 'containers/App/selectors';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

const { Sider, Content } = Layout;
const WIDTH = 992;
const OTP_LENGTH = 6;

const stateSelector = createStructuredSelector({
  device: makeDeviceSelector(),
  collapsed: makeCollapsedSelector(),
  otpError: makeOtpErrorSelector(),
  otpVerified: makeOtpVerificationSelector(),
  otpValue: makeOtpValueSelector(),
});

const LayoutPage = () => {
  const dispatch = useDispatch();
  const { device, collapsed, otpError, otpVerified, otpValue } =
    useSelector(stateSelector);
  const isMobile = device === 'MOBILE';
  const location = useLocation();
  const navigate = useNavigate();

  const onChangeOtp = (otp) => {
    dispatch(changeOtpValueAction(otp));
  };
  const onVerifyOtp = () => {
    if (otpValue.trim().length === OTP_LENGTH) {
      dispatch(authenticateOtpAction());
    } else {
      dispatch(otpCodeErrorAction());
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
    <Layout className="layout-page mh-100">
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
          <AlertMessage />
          <OtpModal
            visible={!otpVerified}
            autoFocus
            length={OTP_LENGTH}
            className="otp-wrapper"
            inputClassName={`otpInput ${otpError ? 'shake-input' : ''}`}
            onChangeOTP={onChangeOtp}
            onVerifyOtp={onVerifyOtp}
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
