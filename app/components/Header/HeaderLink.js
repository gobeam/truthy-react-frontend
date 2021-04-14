import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default styled(NavLink)`
  color: rgba(0, 0, 0, 0.5);
  display: block;
  padding: 0.5rem 1rem;
  @media (min-width: 768px) {
    .navbar-expand-md .navbar-nav .nav-link {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
  }
`;
