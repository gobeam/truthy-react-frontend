import React from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import PropTypes from 'prop-types';
import messages from 'containers/PermissionModule/messages';
import { FormattedMessage } from 'react-intl';

const SyncModal = (props) => {
  const { showModal, handleClose, handleConfirm } = props;
  return (
    <>
      <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">
            <FormattedMessage {...messages.syncConfirm} />
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <p>
            <FormattedMessage {...messages.syncConfirmationMessage} />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            <FormattedMessage {...messages.syncOk} />
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleClose}
          >
            <FormattedMessage {...messages.cancelBtn} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

SyncModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default SyncModal;
