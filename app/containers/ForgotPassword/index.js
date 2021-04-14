/**
 *
 * ForgotPasswordPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ForgotPassword/saga';
import reducer from 'containers/ForgotPassword/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import ValidationMessageWrapper from 'components/ValidationMessageWrapper';
import {
  changeFieldAction,
  validateFormAction,
} from 'containers/ForgotPassword/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeEmailSelector,
  makeErrorsSelector,
} from 'containers/ForgotPassword/selectors';
import { Helmet } from 'react-helmet';
import {
  hideHeaderAction,
  publicRedirectLoggedAction,
} from 'containers/App/actions';
import InputWrapper from 'components/InputWrapper';
import { NavLink } from 'react-router-dom';
import logoImage from 'logo.svg';

const key = 'forgotPassword';

const stateSelector = createStructuredSelector({
  email: makeEmailSelector(),
  errors: makeErrorsSelector(),
});
export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const hideHeader = () => dispatch(hideHeaderAction(true));
  const redirectIfLogged = () => dispatch(publicRedirectLoggedAction());
  const submitForgotPasswordForm = (e) =>
    dispatch(validateFormAction()) && e.preventDefault();
  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));
  const { email, errors } = useSelector(stateSelector);
  useEffect(() => {
    hideHeader();
    redirectIfLogged();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src={logoImage} alt="wip.team" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Forget Password
            <Helmet title="Forget Password" />
          </h2>
          {/* <p className="mt-2 text-center text-sm leading-5 text-gray-600"> */}

          {/* /!*<NavLink to="/login" className="ml-2 font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline transition ease-in-out duration-150">Login</NavLink>*!/ */}
          {/* </p> */}
        </div>
        <form
          className="flex flex-col pt-3 md:pt-8"
          onSubmit={submitForgotPasswordForm}
        >
          <div className="flex flex-col pt-4 mb-10">
            <label htmlFor="password" className="text-md font-bold">
              Email
            </label>
            <InputWrapper
              type="email"
              name="email"
              value={email}
              onChange={onChangeField}
              invalid={!!errors.email}
              placeholder="Input your email"
            />
            <ValidationMessageWrapper error={errors.email} />
          </div>
          <input
            type="submit"
            value="Submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out"
          />
        </form>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600">
          <NavLink
            to="/login"
            className="ml-2 font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
