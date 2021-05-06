import React from 'react';
import { useLocation } from 'react-router-dom';
import { Accordion, Nav } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const CollapsibleNavItem = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const { eventKey, title, icon, children = null } = props;
  const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : '';

  return (
    <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Button
          as={Nav.Link}
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <span className="sidebar-icon">
              <FontAwesomeIcon icon={icon} />{' '}
            </span>
            <span className="sidebar-text">{title}</span>
          </span>
        </Accordion.Button>
        <Accordion.Body className="multi-level">
          <Nav className="flex-column">{children}</Nav>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

CollapsibleNavItem.propTypes = {
  title: PropTypes.string,
  eventKey: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.object,
};

export default CollapsibleNavItem;
