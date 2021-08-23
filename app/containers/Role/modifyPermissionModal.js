import React, { useEffect, useState } from 'react';
import { message, Modal, Tree } from 'antd';
import { useIntl } from 'react-intl';
import commonMessages from 'common/messages';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeInitialValuesSelector,
  makeIsLoadingSelector,
  makePermissionListSelector,
} from 'containers/Role/selectors';
import { changeFieldAction, submitFormAction } from 'containers/Role/actions';

const stateSelector = createStructuredSelector({
  permissionList: makePermissionListSelector(),
  initialValues: makeInitialValuesSelector(),
  isLoading: makeIsLoadingSelector(),
});

const ModifyPermissionModal = ({ onCancel, visible }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { permissionList, initialValues, isLoading } =
    useSelector(stateSelector);
  const [permissionId, setPermissionId] = useState([]);

  useEffect(() => {
    if (initialValues?.permissions) {
      setPermissionId(initialValues.permissions);
    }
  }, [initialValues]);

  const onCancelModal = () => {
    dispatch(changeFieldAction('formValues', {}));
    onCancel();
  };
  const onOk = () => {
    if (permissionId.length < 1) {
      message.info(intl.formatMessage(commonMessages.emptyPermissionError));
    } else {
      dispatch(submitFormAction());
      onCancel();
    }
  };

  const onCheck = (checkedKeysValue) => {
    const permissions = checkedKeysValue.filter(
      (ids) => typeof ids === 'number',
    );
    setPermissionId(permissions);
    dispatch(changeFieldAction('formValues', { permissions }));
  };

  return (
    <Modal
      confirmLoading={isLoading}
      title={intl.formatMessage(commonMessages.modifyPermission)}
      visible={visible}
      onOk={onOk}
      onCancel={onCancelModal}
    >
      <Tree
        disabled={isLoading}
        selectable={false}
        defaultExpandAll
        checkable
        onCheck={onCheck}
        checkedKeys={permissionId}
        treeData={permissionList}
      />
    </Modal>
  );
};

ModifyPermissionModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default ModifyPermissionModal;
