import React, { useEffect } from 'react';
import { Card, Col, Container, Form, Row } from '@themesberg/react-bootstrap';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import messages from 'containers/PermissionModule/messages';
import commonMessages from 'common/messages';
import FormWrapper from 'components/FormInputWrapper';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  clearFormAction,
  getPermissionByIdAction,
  validateFormAction,
} from 'containers/PermissionModule/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeDescriptionSelector,
  makeErrorSelector,
  makeFormMethodSelector,
  makeFormTitleSelector,
  makeIsLoadingSelector,
  makeMethodNameSelector,
  makePathNameSelector,
  makeResourceNameSelector,
  makeUpdateIdSelector,
} from 'containers/PermissionModule/selectors';
import { FormattedMessage } from 'react-intl';
import ButtonWrapper from 'components/ButtonWrapper';

const stateSelector = createStructuredSelector({
  resource: makeResourceNameSelector(),
  path: makePathNameSelector(),
  method: makeMethodNameSelector(),
  description: makeDescriptionSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
  formTitle: makeFormTitleSelector(),
  formMethod: makeFormMethodSelector(),
  updateId: makeUpdateIdSelector(),
});

const PermissionForm = () => {
  const dispatch = useDispatch();
  const {
    updateId,
    formTitle,
    resource,
    path,
    method,
    description,
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
      dispatch(getPermissionByIdAction(updateId));
    }
  }, [updateId]);

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
                    label={messages.resourceLabel}
                    name="resource"
                    id="resource"
                    type="text"
                    value={resource}
                    required={false}
                    focus={false}
                    placeholder={messages.resourcePlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.resource}
                  />

                  <FormWrapper
                    label={messages.descriptionLabel}
                    name="description"
                    id="description"
                    type="text"
                    value={description}
                    required={false}
                    focus={false}
                    placeholder={messages.descriptionPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.description}
                  />

                  <FormWrapper
                    label={messages.methodLabel}
                    name="method"
                    id="method"
                    type="text"
                    value={method}
                    required={false}
                    focus={false}
                    placeholder={messages.methodPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.method}
                  />

                  <FormWrapper
                    label={messages.pathLabel}
                    name="path"
                    id="path"
                    type="text"
                    value={path}
                    required={false}
                    focus={false}
                    placeholder={messages.pathPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.path}
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
