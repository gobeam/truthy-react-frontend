import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from '@themesberg/react-bootstrap';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import messages from 'containers/EmailTemplateModule/messages';
import commonMessages from 'common/messages';
import FormWrapper from 'components/FormInputWrapper';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  clearFormAction,
  getTemplateByIdAction,
  validateFormAction,
} from 'containers/EmailTemplateModule/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorSelector,
  makeFormMethodSelector,
  makeFormTitleSelector,
  makeIsLoadingSelector,
  makeSenderSelector,
  makeSubjectSelector,
  makeTemplateBodySelector,
  makeTemplateTitleSelector,
  makeUpdateIdSelector,
} from 'containers/EmailTemplateModule/selectors';
import { FormattedMessage } from 'react-intl';
import ButtonWrapper from 'components/ButtonWrapper';
import DraftEditor from 'components/DraftEditor';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import validationMessages from 'helpers/messages';
import CustomErrorWrapper from 'components/CustomErrorWrapper';

const stateSelector = createStructuredSelector({
  title: makeTemplateTitleSelector(),
  subject: makeSubjectSelector(),
  sender: makeSenderSelector(),
  body: makeTemplateBodySelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
  formTitle: makeFormTitleSelector(),
  formMethod: makeFormMethodSelector(),
  updateId: makeUpdateIdSelector(),
});

const PermissionForm = () => {
  const dispatch = useDispatch();
  const {
    title,
    subject,
    updateId,
    formTitle,
    sender,
    body,
    errors,
    isLoading,
  } = useSelector(stateSelector);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const togglePageOff = () => {
    dispatch(changeFieldAction('formPage', false));
    dispatch(clearFormAction());
  };

  const onEditorStateChange = (editState) => {
    setEditorState(editState);
    dispatch(
      changeFieldAction(
        'editedBody',
        draftToHtml(convertToRaw(editState.getCurrentContent())),
      ),
    );
  };

  const handleSubmitForm = (e) =>
    dispatch(validateFormAction()) && e.preventDefault();

  useEffect(() => {
    if (updateId) {
      dispatch(getTemplateByIdAction(updateId));
    }
  }, [updateId]);

  useEffect(() => {
    if (body) {
      const contentBlock = htmlToDraft(body);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorDataState = EditorState.createWithContent(contentState);
      setEditorState(editorDataState);
    }
  }, [body]);

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
                    label={messages.titleLabel}
                    name="title"
                    id="title"
                    type="text"
                    value={title}
                    required={false}
                    focus={false}
                    placeholder={messages.titlePlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.title}
                  />

                  <FormWrapper
                    label={messages.subjectLabel}
                    name="subject"
                    id="subject"
                    type="text"
                    value={subject}
                    required={false}
                    focus={false}
                    placeholder={messages.subjectPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.subject}
                  />

                  <FormWrapper
                    label={messages.senderLabel}
                    name="sender"
                    id="sender"
                    type="email"
                    value={sender}
                    required={false}
                    focus={false}
                    placeholder={messages.senderPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.sender}
                  />

                  <Form.Group id="status" className="mb-3">
                    <Form.Label>
                      <FormattedMessage {...messages.bodyLabel} />
                    </Form.Label>
                    <DraftEditor
                      invalid={!!errors.body}
                      onChange={onEditorStateChange}
                      onEditorStateChange={onEditorStateChange}
                      editorState={editorState}
                    />
                    <CustomErrorWrapper>
                      {errors.body && validationMessages[errors.body] ? (
                        <FormattedMessage
                          {...validationMessages[errors.body]}
                        />
                      ) : (
                        errors.body
                      )}
                    </CustomErrorWrapper>
                  </Form.Group>

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
