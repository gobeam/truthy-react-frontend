/**
 *
 * RegisterForm
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InputWrapper from 'components/InputWrapper';
import {
  changeFieldAction,
  onFormValidation,
} from 'containers/RegisterPage/actions';
import {
  makeConfirmPasswordSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
  makeNameSelector,
  makePasswordSelector,
} from 'containers/RegisterPage/selectors';
import ValidationMessageWrapper from 'components/ValidationMessageWrapper';

const stateSelector = createStructuredSelector({
  email: makeEmailSelector(),
  name: makeNameSelector(),
  password: makePasswordSelector(),
  confirmPassword: makeConfirmPasswordSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  const {
    email,
    password,
    errors,
    isLoading,
    name,
    confirmPassword,
  } = useSelector(stateSelector);

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));
  const onSetCompanyId = (key, value) =>
    dispatch(changeFieldAction(key, value));
  const submitRegisterForm = (e) =>
    dispatch(onFormValidation()) && e.preventDefault();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const company = urlParams.get('company');
    onSetCompanyId('company', company);
  }, []);

  return (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={submitRegisterForm}>
      <div className="flex flex-col pt-4">
        <label htmlFor="email" className="text-md font-bold">
          Name
        </label>
        <InputWrapper
          type="text"
          name="name"
          value={name}
          onChange={onChangeField}
          invalid={!!errors.name}
          placeholder="Input your name"
        />
        <ValidationMessageWrapper error={errors.name} />
      </div>

      <div className="flex flex-col pt-4">
        <label htmlFor="email" className="text-md font-bold">
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

      <div className="flex flex-col pt-4">
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

      <div className="flex flex-col pt-4 mb-10">
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
        value="Sign up"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out"
        disabled={isLoading}
      />
    </form>
  );
}
