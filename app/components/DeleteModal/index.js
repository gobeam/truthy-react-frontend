import React from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import PropTypes from 'prop-types';
import messages from 'components/DeleteModal/messages';
import { FormattedMessage } from 'react-intl';

function DeleteModal({ showModal, handleClose, handleConfirm }) {
  return (
    <>
      <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">
            <FormattedMessage {...messages.title} />
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <p>
            <FormattedMessage {...messages.confirmationMessage} />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirm}>
            <FormattedMessage {...messages.deleteBtn} />
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
}

DeleteModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default DeleteModal;
