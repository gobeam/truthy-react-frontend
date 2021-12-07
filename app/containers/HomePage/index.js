// @ts-nocheck
/**
 *
 * HomePage
 *
 */
import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
// import { NavLink } from 'react-router-dom';
import Navbar from 'common/layout/Navbar';
import TruthyHelps from 'common/HomeContent/TruthyHelps';
import Contributors from 'common/HomeContent/Contributors';
import saga from './saga';
// import NavImg from '../../assets/images/navbar.png'
import Banner from './banner';

export default function HomePage() {
  useInjectSaga({ key: 'homePage', saga });

  return (
    <div className="home-page">
      <div className="home-wrapper mh-100">
        <div className="side-img">
          {/* <img src={NavImg} className="img-fluid" alt="nav-img" /> */}
        </div>
        <Navbar />
        <Banner />
        <TruthyHelps />
        <Contributors />
        {/* <NavLink to="/login" className="btn-primary">
          Login
        </NavLink> */}
      </div>
    </div>
  );
}
