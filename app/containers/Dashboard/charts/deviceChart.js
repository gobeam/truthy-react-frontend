import { Card, Radio, Typography } from 'antd';
import { Pie } from '@ant-design/charts';
import React from 'react';
import PropTypes from 'prop-types';
import { BROWSER, OS } from 'containers/Dashboard/constants';
import { useIntl } from 'react-intl';
import messages from 'containers/Dashboard/messages';

const { Text } = Typography;

const DeviceChart = ({ deviceType, loading, data, handleChange }) => {
  const intl = useIntl();

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: deviceType,
      },
    },
  };

  return (
    <Card
      loading={loading}
      className=""
      bordered={false}
      title={intl.formatMessage(messages.deviceChart)}
      style={{
        height: '100%',
      }}
      extra={
        <div className="">
          <div className="">
            <Radio.Group value={deviceType} onChange={handleChange}>
              <Radio.Button value={BROWSER}>Browser</Radio.Button>
              <Radio.Button value={OS}>Os</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
    >
      <div>
        <Text>{intl.formatMessage(messages.deviceChart)}</Text>
        <Pie {...config} />
      </div>
    </Card>
  );
};

DeviceChart.propTypes = {
  deviceType: PropTypes.string,
  intl: PropTypes.object,
  loading: PropTypes.bool,
  handleChange: PropTypes.func,
  data: PropTypes.array,
};

export default DeviceChart;
