import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from '@themesberg/react-bootstrap';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import messages from 'containers/UserModule/messages';
import commonMessages from 'common/messages';
import FormWrapper from 'components/FormInputWrapper';
import SelectInput from 'components/SelectInputWrapper';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  clearFormAction,
  getUserByIdAction,
  validateFormAction,
} from 'containers/UserModule/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeEmailSelector,
  makeErrorSelector,
  makeFormMethodSelector,
  makeFormTitleSelector,
  makeIsLoadingSelector,
  makeNameSelector,
  makeRoleIdSelector,
  makeRolesListSelector,
  makeStatusSelector,
  makeUpdateIdSelector,
  makeUserNameSelector,
} from 'containers/UserModule/selectors';
import { FormattedMessage } from 'react-intl';
import ButtonWrapper from 'components/ButtonWrapper';
import validationMessages from 'helpers/messages';

const stateSelector = createStructuredSelector({
  roles: makeRolesListSelector(),
  name: makeNameSelector(),
  username: makeUserNameSelector(),
  email: makeEmailSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
  formTitle: makeFormTitleSelector(),
  formMethod: makeFormMethodSelector(),
  updateId: makeUpdateIdSelector(),
  roleId: makeRoleIdSelector(),
  status: makeStatusSelector(),
});

const PermissionForm = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(null);
  const {
    roles,
    roleId,
    updateId,
    formTitle,
    name,
    status,
    email,
    username,
    errors,
    isLoading,
  } = useSelector(stateSelector);

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const togglePageOff = () => {
    dispatch(changeFieldAction('formPage', false));
    dispatch(clearFormAction());
  };

  const handleSubmitForm = (e) =>
    dispatch(validateFormAction()) && e.preventDefault();

  useEffect(() => {
    if (updateId) {
      dispatch(getUserByIdAction(updateId));
    }
  }, [updateId]);

  useEffect(() => {
    const optionsList = roles.map((role) => (
      <option key={role.id} value={role.id}>
        {role.name}
      </option>
    ));
    setOptions(optionsList);
  }, [roles]);

  return (
    <article>
      <Container className="px-0">
        <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
          <Col className="d-block mb-4 mb-md-0">
            <h1 className="h2">
              <FormattedMessage {...formTitle} />
            </h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Form
                  onSubmit={handleSubmitForm}
                  noValidate
                  validated={errors.length < 1}
                >
                  <FormWrapper
                    label={messages.nameLabel}
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    required={false}
                    focus={false}
                    placeholder={messages.namePlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.name}
                  />

                  <FormWrapper
                    label={messages.emailLabel}
                    name="email"
                    id="email"
                    type="text"
                    value={email}
                    required={false}
                    focus={false}
                    placeholder={messages.emailPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.email}
                  />

                  <FormWrapper
                    label={messages.usernameLabel}
                    name="username"
                    id="username"
                    type="text"
                    value={username}
                    required={false}
                    focus={false}
                    placeholder={messages.usernamePlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.username}
                  />

                  <Form.Group id="status" className="mb-3">
                    <Form.Label>
                      <FormattedMessage {...messages.statusLabel} />
                    </Form.Label>
                    <Form.Check
                      isInvalid={errors.status}
                      checked={status === 'active'}
                      onChange={onChangeField}
                      type="radio"
                      defaultValue="active"
                      label={<FormattedMessage {...messages.active} />}
                      name="status"
                      id="active"
                      htmlFor="active"
                    />
                    <Form.Check
                      isInvalid={errors.status}
                      checked={status === 'inactive'}
                      onChange={onChangeField}
                      type="radio"
                      defaultValue="inactive"
                      label={<FormattedMessage {...messages.inactive} />}
                      name="status"
                      id="inactive"
                      htmlFor="inactive"
                    />
                    <Form.Check
                      isInvalid={errors.status}
                      checked={status === 'blocked'}
                      onChange={onChangeField}
                      type="radio"
                      defaultValue="blocked"
                      label={<FormattedMessage {...messages.blocked} />}
                      name="status"
                      id="blocked"
                      htmlFor="blocked"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.status && validationMessages[errors.status] ? (
                        <FormattedMessage
                          {...validationMessages[errors.status]}
                        />
                      ) : (
                        errors.status
                      )}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <SelectInput
                    label={messages.roleLabel}
                    options={options}
                    name="roleId"
                    id="roleId"
                    value={roleId}
                    required={false}
                    focus={false}
                    placeholder={messages.usernamePlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.roleId}
                  />

                  <ButtonWrapper
                    type="submit"
                    icon={faCheck}
                    disabled={isLoading}
                    variant="success"
                    classname="m-1"
                    label={commonMessages.submit}
                  />

                  <ButtonWrapper
                    type="button"
                    disabled={isLoading}
                    icon={faTimes}
                    variant="danger"
                    classname="m-1"
                    handler={togglePageOff}
                    label={commonMessages.cancel}
                  />
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </article>
  );
};

export default PermissionForm;
