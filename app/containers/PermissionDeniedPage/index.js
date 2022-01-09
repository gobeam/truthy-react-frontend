/**
 * PermissionDeniedPage
 *
 * This is the page we show when the user visits a url that doesn't have permission to a route
 */
import React from 'react';
import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/PermissionDeniedPage/messages';
import { useNavigate } from 'react-router-dom';

/**
 * @return {boolean}
 */

const PermissionDeniedPage = () => {
  const navigate = useNavigate();
  const clickBack = () => navigate('/login');
  return (
    <div className="mh-100">
      <Result
        status="403"
        title={<FormattedMessage {...messages.header} />}
        subTitle={<FormattedMessage {...messages.message} />}
        extra={
          <Button type="primary" onClick={clickBack}>
            <FormattedMessage {...messages.back} />
          </Button>
        }
      />
    </div>
  );
};

export default PermissionDeniedPage;
