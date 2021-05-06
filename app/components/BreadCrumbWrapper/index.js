import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '@themesberg/react-bootstrap';

const BreadcrumbWrapper = (props) => {
  const { title, breadCrumbItem } = props;
  return (
    <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-xl-0">
        <Breadcrumb
          className="d-none d-md-inline-block"
          listProps={{ className: 'breadcrumb-dark breadcrumb-transparent' }}
        >
          <Breadcrumb.Item href="/">
            <FontAwesomeIcon icon={faHome} />
          </Breadcrumb.Item>
          {breadCrumbItem.map((item) => (
            <Breadcrumb.Item href={item.href} key={item.key}>
              {item.title}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <h4>{title}</h4>
      </div>
    </div>
  );
};

BreadcrumbWrapper.propTypes = {
  title: PropTypes.object,
  breadCrumbItem: PropTypes.array,
};

export default BreadcrumbWrapper;
