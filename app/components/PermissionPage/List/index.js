import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Table } from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/PermissionModule/messages';
import BreadCrumbWrapper from 'components/BreadCrumbWrapper';
import TablePagination from 'components/TablePagination';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import DeleteModal from 'components/DeleteModal';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  changeFieldAction,
  deleteItemByIdAction,
} from 'containers/PermissionModule/actions';
import commonMessages from 'common/messages';
import ButtonWrapper from 'components/ButtonWrapper';
import { checkPermissionForComponent } from 'utils/permission';
import SearchInput from 'components/SearchInput';

const breadCrumbItem = [
  {
    href: '#',
    key: 'permission-list',
    title: <FormattedMessage {...messages.listTitle} />,
  },
];

function RoleList(props) {
  const {
    permissions,
    changePage,
    togglePageOn,
    user,
    loadPermissions,
    limit,
  } = props;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleConfirm = () => {
    dispatch(deleteItemByIdAction(deleteId));
    setShowModal(false);
  };

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    loadPermissions();
  };

  const handleClose = () => setShowModal(false);
  const handleDeleteItem = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  return (
    <>
      <BreadCrumbWrapper
        title={<FormattedMessage {...messages.listTitle} />}
        breadCrumbItem={breadCrumbItem}
      />

      <Button
        variant="outline-primary"
        className="m-1"
        onClick={() => togglePageOn('post')}
      >
        <FontAwesomeIcon icon={faPlus} className="me-2" />
        <FormattedMessage {...messages.addLabel} />
      </Button>

      <SearchInput
        limit={limit}
        onChangeField={onChangeField}
        onSubmitForm={handleSubmitForm}
      />

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">
                  <FormattedMessage {...messages.resourceLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.descriptionLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.methodLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.pathLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.dateLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.actionLabel} />
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.results.map((permission) => (
                <tr key={permission.id}>
                  <td>
                    <span className="fw-normal">{permission.resource}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{permission.description}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{permission.method}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{permission.path}</span>
                  </td>
                  <td>
                    <span className="fw-normal">
                      <FormattedMessage
                        {...messages.createdAt}
                        values={{ ts: Date.parse(permission.createdAt) }}
                      />
                    </span>
                  </td>
                  <td>
                    <ButtonWrapper
                      show={checkPermissionForComponent(user.role, {
                        resource: 'permission',
                        method: 'put',
                        path: '/permissions/:id',
                      })}
                      type="button"
                      icon={faEdit}
                      variant="primary"
                      classname="m-1 btn-sm"
                      handler={() => togglePageOn('put', permission.id)}
                      label={commonMessages.editLabel}
                    />

                    <ButtonWrapper
                      show={checkPermissionForComponent(user.role, {
                        resource: 'permission',
                        method: 'delete',
                        path: '/permissions/:id',
                      })}
                      type="button"
                      icon={faTrashAlt}
                      variant="danger"
                      classname="m-1 btn-sm"
                      handler={() => handleDeleteItem(permission.id)}
                      label={commonMessages.removeLabel}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {permissions.results && permissions.results.length > 0 ? (
            <TablePagination
              limit={limit}
              currentPage={permissions.currentPage}
              pageSize={permissions.pageSize}
              totalItems={permissions.totalItems}
              previous={permissions.previous}
              next={permissions.next}
              handlePageChange={changePage}
            />
          ) : (
            ''
          )}
        </Card.Body>
      </Card>
      <DeleteModal
        showModal={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

RoleList.propTypes = {
  limit: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  togglePageOn: PropTypes.func.isRequired,
  loadPermissions: PropTypes.func.isRequired,
};

export default RoleList;
