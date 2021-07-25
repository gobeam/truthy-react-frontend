import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { PageHeader } from 'antd';
import history from 'utils/history';

const PageHeaderWrapper = (props) => {
  const intl = useIntl();
  const { ghost = false, children, title, subtitle, extra, avatar } = props;

  return (
    <PageHeader
      ghost={ghost}
      onBack={() => history.back()}
      title={intl.formatMessage(title)}
      subTitle={subtitle ? intl.formatMessage(subtitle) : null}
      extra={extra}
      avatar={avatar}
      // extra={[<Button key="3">Edit</Button>]}
    >
      {children}
    </PageHeader>
  );
};

PageHeaderWrapper.propTypes = {
  ghost: PropTypes.bool,
  title: PropTypes.object.isRequired,
  subtitle: PropTypes.object,
  extra: PropTypes.array,
  avatar: PropTypes.object,
  children: PropTypes.node,
};

export default PageHeaderWrapper;
