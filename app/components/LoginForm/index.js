/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
import { Button, Card, Form } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import AuthFormGroupWrapper from 'components/AuthFormGroupWrapper';
import messages from 'components/LoginForm/messages';
import { FormattedMessage } from 'react-intl';

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
    <Form
      noValidate
      validated={errors.length < 1}
      className="mt-4"
      onSubmit={submitLoginForm}
    >
      <AuthFormGroupWrapper
        label={messages.email}
        name="email"
        id="email"
        type="email"
        value={email}
        required={false}
        focus={false}
        placeholder="example@truthy.com"
        changeHandler={onChangeEmail}
        error={errors.email}
      />

      <AuthFormGroupWrapper
        label={messages.password}
        name="password"
        id="password"
        type="password"
        value={password}
        required={false}
        focus={false}
        placeholder="Password"
        changeHandler={onChangePassword}
        error={errors.password}
      />

      <Form.Group>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Card.Link as={Link} to="/forgot-password" className="small text-end">
            <FormattedMessage {...messages.lostPassword} />
          </Card.Link>
        </div>
      </Form.Group>
      <Button
        disabled={isLoading}
        variant="primary"
        type="submit"
        className="w-100"
      >
        <FormattedMessage {...messages.submit} />
      </Button>
    </Form>
  );
}
