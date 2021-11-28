/**
 *
 * HomePage
 *
 */
import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { NavLink } from 'react-router-dom';
import Navbar from 'common/layout/Navbar';
import saga from './saga';

export default function HomePage() {
  useInjectSaga({ key: 'homePage', saga });

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-wrapper mh-100">
        <NavLink to="/login" className="btn-primary">
          Login
        </NavLink>
      </div>
    </div>
  );
}
