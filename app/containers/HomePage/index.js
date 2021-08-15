/**
 *
 * HomePage
 *
 */
import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { NavLink } from 'react-router-dom';
import saga from './saga';

export default function HomePage() {
  useInjectSaga({ key: 'homePage', saga });

  return (
    <div className="home-wrapper mh-100">
      <p>This is home page</p>
      <NavLink to="/login" className="btn-primary">
        Login
      </NavLink>
    </div>
  );
}
