import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row, Table } from '@themesberg/react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/EmailTemplateModule/messages';
import BreadCrumbWrapper from 'components/BreadCrumbWrapper';
import TablePagination from 'components/TablePagination';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  deleteItemByIdAction,
  queryTemplateAction,
  setPageNumberAction,
} from 'containers/EmailTemplateModule/actions';
import commonMessages from 'common/messages';
import ButtonWrapper from 'components/ButtonWrapper';
import { checkPermissionForComponent } from 'utils/permission';
import SearchInput from 'components/SearchInput';
import { createStructuredSelector } from 'reselect';
import {
  makeLimitSelector,
  makeTemplatesSelector,
} from 'containers/EmailTemplateModule/selectors';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import DeleteModal from 'components/DeleteModal';

const breadCrumbItem = [
  {
    href: '#',
    key: 'email-template-list',
    title: <FormattedMessage {...messages.listTitle} />,
  },
];

const stateSelector = createStructuredSelector({
  templates: makeTemplatesSelector(),
  user: makeLoggedInUserSelector(),
  limit: makeLimitSelector(),
});

function EmailTemplateList() {
  const { templates, user, limit } = useSelector(stateSelector);
  const dispatch = useDispatch();

  const loadUsers = () => dispatch(queryTemplateAction());

  const [showModal, setShowModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => setShowModal(false);

  const onChangeField = (keyName, value) =>
    dispatch(changeFieldAction(keyName, value));

  const handleConfirm = () => {
    dispatch(deleteItemByIdAction(deleteId));
    setShowModal(false);
  };

  const togglePageOn = (method, id = null) => {
    onChangeField('formPage', true);
    onChangeField('formMethod', method);
    onChangeField('updateId', id);
    onChangeField(
      'formTitle',
      method === 'post' ? messages.addTitle : messages.editTitle,
    );
  };

  const setPageNumber = (page) => dispatch(setPageNumberAction(page));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    loadUsers();
  };

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
                  <FormattedMessage {...messages.titleLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.slugLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.subjectLabel} />
                </th>
                <th className="border-bottom">
                  <FormattedMessage {...messages.senderLabel} />
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
              {templates.results && (
                <tr>
                  <td colSpan={6}>No data available</td>
                </tr>
              )}
              {templates.results.map((template) => (
                <tr key={template.id}>
                  <td>
                    <span className="fw-normal">{template.title}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{template.slug}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{template.subject}</span>
                  </td>
                  <td>{template.sender}</td>
                  <td>
                    <span className="fw-normal">
                      <FormattedMessage
                        {...messages.createdAt}
                        values={{ ts: Date.parse(template.createdAt) }}
                      />
                    </span>
                  </td>
                  <td>
                    <ButtonWrapper
                      show={checkPermissionForComponent(user.role, {
                        resource: 'emailTemplates',
                        method: 'put',
                        path: '/email-templates/:id',
                      })}
                      type="button"
                      icon={faEdit}
                      variant="primary"
                      classname="m-1 btn-sm"
                      handler={() => togglePageOn('put', template.id)}
                      label={commonMessages.editLabel}
                    />

                    <ButtonWrapper
                      disabled={template.isDefault}
                      show={checkPermissionForComponent(user.role, {
                        resource: 'emailTemplates',
                        method: 'delete',
                        path: '/email-templates/:id',
                      })}
                      type="button"
                      icon={faTrashAlt}
                      variant="danger"
                      classname="m-1 btn-sm"
                      handler={() => handleDeleteItem(template.id)}
                      label={commonMessages.removeLabel}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {templates.results && templates.results.length > 0 ? (
            <TablePagination
              limit={limit}
              currentPage={templates.currentPage}
              pageSize={templates.pageSize}
              totalItems={templates.totalItems}
              previous={templates.previous}
              next={templates.next}
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

export default EmailTemplateList;
