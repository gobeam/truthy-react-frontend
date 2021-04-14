/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InputWrapper from 'components/InputWrapper';
import ValidationMessageWrapper from 'components/ValidationMessageWrapper';
import {
  changeEmailAction,
  changePasswordAction,
  onFormValidation,
} from 'containers/LoginPage/actions';
import {
  makeEmailSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
  makePasswordSelector,
} from 'containers/LoginPage/selectors';

const stateSelector = createStructuredSelector({
  email: makeEmailSelector(),
  password: makePasswordSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const submitLoginForm = (e) =>
    dispatch(onFormValidation()) && e.preventDefault();
  const onChangePassword = (e) =>
    dispatch(changePasswordAction(e.target.value));
  const onChangeEmail = (e) => dispatch(changeEmailAction(e.target.value));

  const { email, password, errors, isLoading } = useSelector(stateSelector);
  return (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={submitLoginForm}>
      <div className="flex flex-col pt-4">
        <label htmlFor="email" className="text-md font-bold">
          Email
        </label>
        <InputWrapper
          type="email"
          value={email}
          onChange={onChangeEmail}
          invalid={!!errors.email}
          placeholder="Input your email"
        />
        <ValidationMessageWrapper error={errors.email} />
      </div>

      <div className="flex flex-col pt-4 mb-10">
        <label htmlFor="password" className="text-md font-bold">
          Password
        </label>
        <InputWrapper
          type="password"
          value={password}
          onChange={onChangePassword}
          invalid={!!errors.password}
          placeholder="Password"
        />
        <ValidationMessageWrapper error={errors.password} />
      </div>

      <input
        type="submit"
        value="Log In"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out"
        disabled={isLoading}
      />
    </form>
  );
}
