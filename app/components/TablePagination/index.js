import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import messages from 'components/TablePagination/messages';
import { Card, Nav, Pagination } from '@themesberg/react-bootstrap';
import { pagination } from 'utils/pagination';
import { FormattedMessage } from 'react-intl';

const TablePagination = (props) => {
  const {
    currentPage,
    pageSize,
    totalItems,
    next,
    previous,
    handlePageChange,
  } = props;
  const [paginationData, setPaginationData] = useState({
    totalPages: 0,
    start: 0,
    end: 0,
    pages: [],
  });
  useEffect(() => {
    setPaginationData(pagination(currentPage, totalItems, pageSize));
  }, [currentPage, totalItems, pageSize]);

  return (
    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
      <Nav>
        <Pagination className="mb-2 mb-lg-0">
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <FormattedMessage {...messages.first} />
          </Pagination.First>

          <Pagination.Prev
            disabled={!previous}
            onClick={() => handlePageChange(previous)}
          >
            <FormattedMessage {...messages.previous} />
          </Pagination.Prev>

          {paginationData.pages.map((page) => {
            if (page === '...') {
              return (
                <Pagination.Ellipsis key={uuid()}>{page}</Pagination.Ellipsis>
              );
            }
            return (
              <Pagination.Item
                active={page === currentPage}
                key={uuid()}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            disabled={!next}
            onClick={() => handlePageChange(next)}
          >
            <FormattedMessage {...messages.next} />
          </Pagination.Next>

          <Pagination.Last
            disabled={paginationData.totalPages === currentPage}
            onClick={() => handlePageChange(paginationData.totalPages)}
          >
            <FormattedMessage {...messages.last} />
          </Pagination.Last>
        </Pagination>
      </Nav>
      <small className="fw-bold">
        <FormattedMessage {...messages.showing} />
        <b>
          {paginationData.start} - {paginationData.end}
        </b>
        <FormattedMessage {...messages.out} /> <b>{totalItems}</b>{' '}
        <FormattedMessage {...messages.entries} />
      </small>
    </Card.Footer>
  );
};

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  next: PropTypes.number.isRequired,
  previous: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default TablePagination;
