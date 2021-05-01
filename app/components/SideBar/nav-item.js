import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge, Image, Nav } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const NavItem = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const {
    setShow,
    title,
    link,
    external,
    target,
    icon,
    image,
    badgeText,
    badgeBg = 'secondary',
    badgeColor = 'primary',
  } = props;
  const classNames = badgeText
    ? 'd-flex justify-content-start align-items-center justify-content-between'
    : '';
  const navItemClassName = link === pathname ? 'active' : '';
  const linkProps = external ? { href: link } : { as: Link, to: link };

  return (
    <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
      <Nav.Link {...linkProps} target={target} className={classNames}>
        <span>
          {icon ? (
            <span className="sidebar-icon">
              <FontAwesomeIcon icon={icon} />{' '}
            </span>
          ) : null}
          {image ? (
            <Image
              src={image}
              width={20}
              height={20}
              className="sidebar-icon svg-icon"
            />
          ) : null}

          <span className="sidebar-text">{title}</span>
        </span>
        {badgeText ? (
          <Badge
            pill
            bg={badgeBg}
            text={badgeColor}
            className="badge-md notification-count ms-2"
          >
            {badgeText}
          </Badge>
        ) : null}
      </Nav.Link>
    </Nav.Item>
  );
};

NavItem.propTypes = {
  title: PropTypes.object,
  link: PropTypes.string,
  external: PropTypes.bool,
  target: PropTypes.string,
  badgeBg: PropTypes.string,
  badgeColor: PropTypes.string,
  badgeText: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.object,
  setShow: PropTypes.func,
};

export default NavItem;
