import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Col, Row, Table } from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/RoleModule/messages';
import BreadCrumbWrapper from 'components/BreadCrumbWrapper';
import TablePagination from 'components/TablePagination';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import DeleteModal from 'components/DeleteModal';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  changeFieldAction,
  deleteItemByIdAction,
} from 'containers/RoleModule/actions';
import commonMessages from 'common/messages';
import ButtonWrapper from 'components/ButtonWrapper';
import { checkPermissionForComponent } from 'utils/permission';
import SearchInput from 'components/SearchInput';

const breadCrumbItem = [
  {
    href: '#',
    key: 'role-list',
    title: <FormattedMessage {...messages.listTitle} />,
  },
];

function RoleList(props) {
  const { roles, changePage, togglePageOn, user, loadRoles, limit } = props;
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
    loadRoles();
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
      <Row className="justify-content-between align-items-center">
        <Col xs={8} md={6} lg={3} xl={4}>
          <Button
            variant="outline-primary"
            className="m-1"
            onClick={() => togglePageOn('post')}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <FormattedMessage {...messages.addLabel} />
          </Button>
        </Col>
      </Row>

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
                  <FormattedMessage {...messages.nameLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.descriptionLabel} />
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
              {roles.results && (
                <tr>
                  <td colSpan={6}>No data available</td>
                </tr>
              )}
              {roles.results.map((role) => (
                <tr key={role.id}>
                  <td>
                    <span className="fw-normal">{role.name}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{role.description}</span>
                  </td>
                  <td>
                    <span className="fw-normal">
                      <FormattedMessage
                        {...messages.createdAt}
                        values={{ ts: Date.parse(role.createdAt) }}
                      />
                    </span>
                  </td>
                  <td>
                    <ButtonWrapper
                      show={checkPermissionForComponent(user.role, {
                        resource: 'role',
                        method: 'put',
                        path: '/roles/:id',
                      })}
                      type="button"
                      icon={faEdit}
                      variant="primary"
                      classname="m-1 btn-sm"
                      handler={() => togglePageOn('put', role.id)}
                      label={commonMessages.editLabel}
                    />

                    <ButtonWrapper
                      show={checkPermissionForComponent(user.role, {
                        resource: 'role',
                        method: 'delete',
                        path: '/roles/:id',
                      })}
                      type="button"
                      icon={faTrashAlt}
                      variant="danger"
                      classname="m-1 btn-sm"
                      handler={() => handleDeleteItem(role.id)}
                      label={commonMessages.removeLabel}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {roles.results && roles.results.length > 0 ? (
            <TablePagination
              currentPage={roles.currentPage}
              pageSize={roles.pageSize}
              totalItems={roles.totalItems}
              previous={roles.previous}
              next={roles.next}
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
  user: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired,
  roles: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  togglePageOn: PropTypes.func.isRequired,
  loadRoles: PropTypes.func.isRequired,
};

export default RoleList;
