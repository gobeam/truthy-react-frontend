/**
 *
 * ResetPasswordPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ResetPasswordPage/saga';
import reducer from 'containers/ResetPasswordPage/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import ValidationMessageWrapper from 'components/ValidationMessageWrapper';
import {
  changeFieldAction,
  validateFormAction,
} from 'containers/ResetPasswordPage/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeConfirmPasswordSelector,
  makeErrorsSelector,
  makePasswordSelector,
} from 'containers/ResetPasswordPage/selectors';
import { Helmet } from 'react-helmet';
import {
  hideHeaderAction,
  publicRedirectLoggedAction,
} from 'containers/App/actions';
import InputWrapper from 'components/InputWrapper';
import { useParams } from 'react-router-dom';
import logoImage from 'logo.svg';

const key = 'resetPassword';

const stateSelector = createStructuredSelector({
  password: makePasswordSelector(),
  confirmPassword: makeConfirmPasswordSelector(),
  errors: makeErrorsSelector(),
});

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  const redirectIfLogged = () => dispatch(publicRedirectLoggedAction());
  useInjectReducer({ key, reducer });
  const hideHeader = () => dispatch(hideHeaderAction(true));
  const submitResetPasswordPageForm = (e) =>
    dispatch(validateFormAction()) && e.preventDefault();
  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));
  const { password, confirmPassword, errors } = useSelector(stateSelector);
  const { code } = useParams();

  useEffect(() => {
    hideHeader();
  }, []);

  useEffect(() => {
    redirectIfLogged();
    dispatch(changeFieldAction('code', code));
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src={logoImage} alt="logo" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Forget Password
            <Helmet title="Forget Password" />
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600"></p>
        </div>
        <form
          className="flex flex-col pt-3 md:pt-8"
          onSubmit={submitResetPasswordPageForm}
        >
          <div className="flex flex-col pt-4 mb-10">
            <label htmlFor="password" className="text-md font-bold">
              Password
            </label>
            <InputWrapper
              type="password"
              name="password"
              value={password}
              onChange={onChangeField}
              invalid={!!errors.password}
              placeholder="Password"
            />
            <ValidationMessageWrapper error={errors.password} />
          </div>

          <div className="flex flex-col pt-4">
            <label htmlFor="password" className="text-md font-bold">
              Confirm Password
            </label>
            <InputWrapper
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChangeField}
              invalid={!!errors.confirmPassword}
              placeholder="Password"
            />
            <ValidationMessageWrapper error={errors.confirmPassword} />
          </div>
          <input
            type="submit"
            value="Submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out"
          />
        </form>
      </div>
    </div>
  );
}
