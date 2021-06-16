import React, { useState } from 'react';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row, Table } from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/PermissionModule/messages';
import BreadCrumbWrapper from 'components/BreadCrumbWrapper';
import TablePagination from 'components/TablePagination';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import DeleteModal from 'components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  deleteItemByIdAction,
  queryPermissionAction,
  setPageNumberAction,
  syncPermissionAction,
} from 'containers/PermissionModule/actions';
import commonMessages from 'common/messages';
import ButtonWrapper from 'components/ButtonWrapper';
import { checkPermissionForComponent } from 'utils/permission';
import SearchInput from 'components/SearchInput';
import SyncModal from 'components/PermissionPage/SyncModal';
import { createStructuredSelector } from 'reselect';
import {
  makeDescriptionSelector,
  makeLimitSelector,
  makePermissionsSelector,
} from 'containers/PermissionModule/selectors';
import { makeLoggedInUserSelector } from 'containers/App/selectors';

const breadCrumbItem = [
  {
    href: '#',
    key: 'permission-list',
    title: <FormattedMessage {...messages.listTitle} />,
  },
];

const stateSelector = createStructuredSelector({
  permissions: makePermissionsSelector(),
  description: makeDescriptionSelector(),
  user: makeLoggedInUserSelector(),
  limit: makeLimitSelector(),
});

function RoleList() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { permissions, user, limit } = useSelector(stateSelector);

  const loadPermissions = () => dispatch(queryPermissionAction());
  const changePage = (page) => dispatch(setPageNumberAction(page));
  const togglePageOn = (method, id = null) => {
    onChangeField('formPage', true);
    onChangeField('formMethod', method);
    onChangeField('updateId', id);
    onChangeField(
      'formTitle',
      method === 'post' ? messages.addTitle : messages.editTitle,
    );
  };
  const handleConfirm = () => {
    dispatch(deleteItemByIdAction(deleteId));
    setShowModal(false);
  };

  const handleSyncModalConfirm = () => {
    dispatch(syncPermissionAction());
    setShowSyncModal(false);
  };

  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    loadPermissions();
  };

  const handleSyncModalClose = () => setShowSyncModal(false);
  const handleSyncModalOpen = () => setShowSyncModal(true);
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
          <ButtonWrapper
            type="button"
            icon={faPlus}
            variant="outline-primary"
            classname="m-1"
            handler={() => togglePageOn('post')}
            label={messages.addLabel}
          />
        </Col>
        <Col xs={6} md={4} xl={2} className="ps-md-0 text-end">
          <span className="icon icon-sm icon-gray">
            <ButtonWrapper
              show={checkPermissionForComponent(user.role, {
                resource: 'permission',
                method: 'post',
                path: '/permissions/sync',
              })}
              type="button"
              icon={faSync}
              variant="outline-primary"
              classname="m-1 btn-sm"
              handler={handleSyncModalOpen}
              label={messages.syncLabel}
            />
          </span>
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
              {permissions.results && (
                <tr>
                  <td colSpan={6}>No data available</td>
                </tr>
              )}
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
      <SyncModal
        showModal={showSyncModal}
        handleClose={handleSyncModalClose}
        handleConfirm={handleSyncModalConfirm}
      />
      <DeleteModal
        showModal={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

export default RoleList;
