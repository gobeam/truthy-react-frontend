// @ts-nocheck
/**
 *
 * HomePage
 *
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import Navbar from 'common/layout/Navbar';
import TruthyHelps from 'containers/HomePage/truthyHelp';
import Contributors from 'containers/HomePage/contributors';
// import Footer from 'components/Footer';
import reducer from 'containers/HomePage/reducer';
import saga from 'containers/HomePage/saga';
import Banner from 'containers/HomePage/banner';
import {
  makeContributorsSelector,
  makeIsLoadingSelector,
} from 'containers/HomePage/selector';
import { getContributorAction } from 'containers/HomePage/actions';

const key = 'homePage';
const stateSelector = createStructuredSelector({
  contributors: makeContributorsSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function HomePage() {
  const dispatch = useDispatch();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { contributors, isLoading } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(getContributorAction());
  }, []);

  return (
    <div className="home-page">
      <div className="home-wrapper mh-100">
        <div className="side-img">
          {/* <img src={NavImg} className="img-fluid" alt="nav-img" /> */}
        </div>
        <Navbar />
        <Banner />
        <TruthyHelps />
        <Contributors contributors={contributors} loading={isLoading} />
        {/* <Footer /> */}
        {/* <NavLink to="/login" className="btn-primary">
          Login
        </NavLink> */}
      </div>
    </div>
  );
}
