/**
 *
 * RegisterForm
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  changeFieldAction,
  onFormValidation,
} from 'containers/RegisterPage/actions';
import {
  makeAcceptSelector,
  makeConfirmPasswordSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
  makeNameSelector,
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/RegisterPage/selectors';
import messages from 'containers/RegisterPage/messages';
import loginMessages from 'components/LoginForm/messages';
import { Button, Card, Form, FormCheck } from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import AuthFormGroupWrapper from 'components/AuthFormGroupWrapper';
import validationMessages from 'helpers/messages';
import { faEnvelope, faLock, faFont } from '@fortawesome/free-solid-svg-icons';

const stateSelector = createStructuredSelector({
  username: makeUsernameSelector(),
  accept: makeAcceptSelector(),
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
    username,
    accept,
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
    <Form
      noValidate
      validated={errors.length < 1}
      className="mt-4"
      onSubmit={submitRegisterForm}
    >
      <AuthFormGroupWrapper
        label={messages.name}
        name="name"
        id="name"
        type="text"
        value={name}
        icon={faFont}
        required={false}
        focus={false}
        placeholder={messages.name}
        changeHandler={onChangeField}
        error={errors.name}
      />

      <AuthFormGroupWrapper
        label={loginMessages.email}
        name="email"
        id="email"
        type="email"
        value={email}
        icon={faEnvelope}
        required={false}
        focus={false}
        placeholder={loginMessages.emailPlaceHolder}
        changeHandler={onChangeField}
        error={errors.email}
      />

      <AuthFormGroupWrapper
        label={messages.username}
        name="username"
        id="username"
        type="text"
        value={username}
        icon={faFont}
        required={false}
        focus={false}
        placeholder={messages.username}
        changeHandler={onChangeField}
        error={errors.username}
      />

      <AuthFormGroupWrapper
        label={loginMessages.password}
        name="password"
        id="password"
        min={6}
        max={20}
        type="password"
        value={password}
        icon={faLock}
        required={false}
        focus={false}
        placeholder={loginMessages.passwordPlaceHolder}
        changeHandler={onChangeField}
        error={errors.password}
      />

      <AuthFormGroupWrapper
        label={loginMessages.confirmPassword}
        name="confirmPassword"
        id="confirmPassword"
        min={6}
        max={20}
        type="password"
        value={confirmPassword}
        icon={faLock}
        required={false}
        focus={false}
        placeholder={loginMessages.passwordPlaceHolder}
        changeHandler={onChangeField}
        error={errors.confirmPassword}
      />

      <FormCheck type="checkbox" className="d-flex mb-4">
        <FormCheck.Input
          name="accept"
          isInvalid={!!errors.accept}
          value={accept}
          onChange={onChangeField}
          id="terms"
          className="me-2"
        />
        <FormCheck.Label htmlFor="terms">
          <FormattedMessage {...messages.agreeTo} />
          <Card.Link>
            <FormattedMessage {...messages.agreeLinkText} />
          </Card.Link>
        </FormCheck.Label>

        <Form.Control.Feedback type="invalid">
          {errors.accept ? (
            <FormattedMessage {...validationMessages[errors.accept]} />
          ) : (
            ''
          )}
        </Form.Control.Feedback>
      </FormCheck>

      <Button
        disabled={isLoading}
        variant="primary"
        type="submit"
        className="w-100"
      >
        <FormattedMessage {...messages.signBtn} />
      </Button>
    </Form>
  );
}
