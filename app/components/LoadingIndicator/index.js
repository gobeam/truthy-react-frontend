import React from 'react';

import { Spin } from 'antd';
import Wrapper from 'components/LoadingIndicator/Wrapper';

const LoadingIndicator = () => (
  <Wrapper>
    <Spin />
  </Wrapper>
);

export default LoadingIndicator;
