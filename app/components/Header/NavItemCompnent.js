import { NavItem } from 'reactstrap';
import HeaderLink from 'components/Header/HeaderLink';
import React from 'react';
import PropTypes from 'prop-types';

export const NavItemComponent = ({ navItems }) =>
  navItems.map((item) => (
    <NavItem key={item.url}>
      <HeaderLink to={item.url} activeClassName="selected">
        {item.icon} {item.name}
      </HeaderLink>
    </NavItem>
  ));

NavItemComponent.propTypes = {
  navItems: PropTypes.array,
};
