import React from 'react';
import PropTypes from 'prop-types';
import messages from 'components/SearchInput/messages';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
const { Search } = Input;

const SearchInput = (props) => {
  const { onSearch, intl, isLoading } = props;

  return (
    <Search
      placeholder={intl.formatMessage(messages.searchPlaceHolder)}
      allowClear
      loading={isLoading}
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  );
};

SearchInput.propTypes = {
  isLoading: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SearchInput);
