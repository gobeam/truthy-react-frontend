import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from '@themesberg/react-bootstrap';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import messages from 'containers/RoleModule/messages';
import commonMessages from 'common/messages';
import FormWrapper from 'components/FormInputWrapper';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  clearFormAction,
  getRoleByIdAction,
  validateFormAction,
} from 'containers/RoleModule/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeDescriptionSelector,
  makeErrorSelector,
  makeFormMethodSelector,
  makeFormTitleSelector,
  makeIsLoadingSelector,
  makeNameSelector,
  makePermissionListSelector,
  makePermissionsSelector,
  makeUpdateIdSelector,
} from 'containers/RoleModule/selectors';
import { FormattedMessage } from 'react-intl';
import ButtonWrapper from 'components/ButtonWrapper';
import _ from 'lodash';

const stateSelector = createStructuredSelector({
  name: makeNameSelector(),
  description: makeDescriptionSelector(),
  permissions: makePermissionsSelector(),
  permissionList: makePermissionListSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
  formTitle: makeFormTitleSelector(),
  formMethod: makeFormMethodSelector(),
  updateId: makeUpdateIdSelector(),
});

const CheckBoxItems = (props) => {
  const { permissionList, resourceKey, onChangeField, permissionItems } = props;
  return (
    <>
      {permissionList[resourceKey].map((permission) => (
        <Form.Check
          checked={permissionItems.includes(permission.id)}
          onChange={onChangeField}
          id={permission.id}
          htmlFor={permission.id}
          label={permission.description}
          value={permission.id}
          key={permission.id}
        />
      ))}
    </>
  );
};

const RoleForm = () => {
  const dispatch = useDispatch();
  const {
    updateId,
    formTitle,
    name,
    description,
    permissions,
    errors,
    isLoading,
    permissionList,
  } = useSelector(stateSelector);

  const [permissionItems, setPermissionItems] = useState([]);

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const togglePageOff = () => {
    dispatch(changeFieldAction('formPage', false));
    dispatch(clearFormAction());
  };

  const handleSubmitForm = (e) =>
    dispatch(validateFormAction()) && e.preventDefault();

  const onCheckByResource = (e) => {
    let selectedPermissions = permissionItems;
    const resourcePermission = permissionList[e.target.value];
    const permissionIds = resourcePermission.map((item) => item.id);
    if (e.target.checked) {
      selectedPermissions = _.union(selectedPermissions, permissionIds);
    } else {
      selectedPermissions = permissionItems.filter(
        (permission) => !permissionIds.includes(permission),
      );
    }
    setPermissionItems(selectedPermissions);
    dispatch(changeFieldAction('permissions', selectedPermissions));
  };

  const onCheckboxChange = (e) => {
    const checkboxValue = Number(e.target.value);
    const selectedPermissions = permissionItems;
    const itemIndex = selectedPermissions.indexOf(checkboxValue);
    if (e.target.checked) {
      if (itemIndex < 0) {
        selectedPermissions.push(checkboxValue);
      }
    } else {
      selectedPermissions.splice(itemIndex, 1);
    }
    setPermissionItems(selectedPermissions);
    dispatch(changeFieldAction('permissions', selectedPermissions));
  };

  useEffect(() => {
    if (updateId) {
      dispatch(getRoleByIdAction(updateId));
    }
  }, [updateId]);

  useEffect(() => {
    setPermissionItems(permissions);
  }, [permissions]);

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
                  <Form.Group id="permission" className="mb-3" key="permission">
                    <Form.Label>
                      <FormattedMessage {...messages.permissionLabel} />

                      {Object.keys(permissionList).map((resource) => (
                        <Card key={resource} className="mt-2">
                          <Card.Body>
                            <Form.Check
                              id={resource}
                              htmlFor={resource}
                              label={resource.toUpperCase()}
                              value={resource}
                              onChange={onCheckByResource}
                            />
                            <CheckBoxItems
                              permissionItems={permissionItems}
                              onChangeField={onCheckboxChange}
                              resourceKey={resource}
                              permissionList={permissionList}
                            />
                          </Card.Body>
                        </Card>
                      ))}
                    </Form.Label>
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

CheckBoxItems.propTypes = {
  permissionItems: PropTypes.array.isRequired,
  permissionList: PropTypes.object.isRequired,
  onChangeField: PropTypes.func.isRequired,
  resourceKey: PropTypes.string.isRequired,
};
export default RoleForm;
