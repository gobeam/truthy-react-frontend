import React from 'react';
import PropTypes from 'prop-types';
import messages from 'components/SearchInput/messages';
import { injectIntl } from 'react-intl';
import { Form, Input } from 'antd';
const { Search } = Input;

const SearchInput = (props) => {
  const { onChangeField, onSubmitForm, intl, isLoading } = props;
  const onSearch = (value) => onChangeField('keywords', value);

  return (
    <Form name="search" onFinish={onSubmitForm}>
      <Search
        placeholder={intl.formatMessage(messages.searchPlaceHolder)}
        allowClear
        loading={isLoading}
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </Form>
  );
  // return (
  //   <div className="table-settings mb-4 mt-4">
  //     <Row className="justify-content-between align-items-center">
  //       <Col xs={8} md={6} lg={3} xl={4}>
  //         <Form onSubmit={onSubmitForm}>
  //           <InputGroup>
  //             <InputGroup.Text>
  //               <FontAwesomeIcon icon={faSearch} />
  //             </InputGroup.Text>
  //             <Form.Control
  //               type="text"
  //               name="keywords"
  //               onChange={onChangeField}
  //               placeholder={intl.formatMessage(messages.searchPlaceHolder)}
  //             />
  //           </InputGroup>
  //         </Form>
  //       </Col>
  //
  //       <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
  //         <Dropdown as={ButtonGroup}>
  //           <Dropdown.Toggle
  //             split
  //             as={Button}
  //             variant="link"
  //             className="text-dark m-0 p-0"
  //           >
  //             <span className="icon icon-sm icon-gray">
  //               <FontAwesomeIcon icon={faCog} />
  //             </span>
  //           </Dropdown.Toggle>
  //           <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
  //             <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
  //             {limitArray.map((limitNumber) => (
  //               <Dropdown.Item
  //                 key={limitNumber}
  //                 className="d-flex fw-bold"
  //                 onClick={() =>
  //                   onChangeField({
  //                     target: { name: 'limit', value: limitNumber },
  //                   })
  //                 }
  //               >
  //                 {limitNumber}
  //                 {limit === limitNumber ? (
  //                   <span className="icon icon-small ms-auto">
  //                     <FontAwesomeIcon icon={faCheck} />{' '}
  //                   </span>
  //                 ) : (
  //                   ''
  //                 )}
  //               </Dropdown.Item>
  //             ))}
  //           </Dropdown.Menu>
  //         </Dropdown>
  //       </Col>
  //     </Row>
  //   </div>
  // );
};

SearchInput.propTypes = {
  isLoading: PropTypes.bool,
  onChangeField: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SearchInput);
