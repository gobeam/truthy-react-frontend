import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  Table,
} from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/RoleModule/messages';
import BreadCrumbWrapper from 'components/BreadCrumbWrapper';
import TablePagination from 'components/TablePagination';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import DeleteModal from 'components/DeleteModal';
import { createStructuredSelector } from 'reselect';
import {
  makeDescriptionSelector,
  makeNameSelector,
  makePageNumberSelector,
  makePermissionsSelector,
  makeRolesSelector,
} from 'containers/RoleModule/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteItemByIdAction,
  queryRolesAction,
  setPageNumberAction,
} from 'containers/RoleModule/actions';

const stateSelector = createStructuredSelector({
  roles: makeRolesSelector(),
  pageNumber: makePageNumberSelector(),
  name: makeNameSelector(),
  description: makeDescriptionSelector(),
  permissions: makePermissionsSelector(),
});

const breadCrumbItem = [
  {
    href: '#',
    key: 'role-list',
    title: <FormattedMessage {...messages.listTitle} />,
  },
];

export default function RoleList() {
  const dispatch = useDispatch();
  const setPageNumber = (pageNumber) =>
    dispatch(setPageNumberAction(pageNumber));
  const { roles, pageNumber } = useSelector(stateSelector);
  const [showModal, setShowDefault] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const loadRoles = () => dispatch(queryRolesAction());
  const handleConfirm = () => dispatch(deleteItemByIdAction(deleteId));
  const handleClose = () => setShowDefault(false);
  const handleDeleteItem = (id) => {
    setShowDefault(true);
    setDeleteId(id);
  };
  useEffect(() => {
    loadRoles();
  }, [pageNumber]);

  return (
    <>
      <BreadCrumbWrapper
        title={<FormattedMessage {...messages.listTitle} />}
        breadCrumbItem={breadCrumbItem}
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
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        as={Button}
                        split
                        variant="link"
                        className="text-dark m-0 p-0"
                      >
                        <span className="icon icon-sm">
                          <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="icon-dark"
                          />
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <FontAwesomeIcon icon={faEye} className="me-2" /> View
                          Details
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <FontAwesomeIcon icon={faEdit} className="me-2" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => handleDeleteItem(role.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                          Remove
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
              handlePageChange={setPageNumber}
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
