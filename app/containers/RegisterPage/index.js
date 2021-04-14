/**
 *
 * LoginPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/RegisterPage/reducer';
import saga from 'containers/RegisterPage/saga';
// Import Components
import RegisterForm from 'components/RegisterForm';
// Import Actions
import { isLoggedAction } from 'containers/RegisterPage/actions';
import { NavLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { hideHeaderAction } from 'containers/App/actions';
import logoImage from 'logo.svg';

const key = 'register';

const stateSelector = createStructuredSelector({
  user: makeLoggedInUserSelector(),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(stateSelector);
  const isLogged = () => dispatch(isLoggedAction());
  const hideHeader = () => dispatch(hideHeaderAction(true));

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    isLogged();
    hideHeader();
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src={logoImage} alt="wip.team" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Get started
            <Helmet title="Register" />
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600">
            Or
            <NavLink
              to="/login"
              className="ml-2 font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Already have an account? Log in
            </NavLink>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
