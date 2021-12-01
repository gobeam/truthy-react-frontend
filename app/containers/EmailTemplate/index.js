/**
 *
 * EmailTemplate
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/EmailTemplate/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/EmailTemplate/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/EmailTemplate/messages';
import {
  makeIsLoadingSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/EmailTemplate/selectors';
import SearchInput from 'components/SearchInput';
import CreateEmailTemplateModal from 'containers/EmailTemplate/createEmailTemplateModal';
import EditEmailTemplateModal from 'containers/EmailTemplate/editEmailTemplateModal';
import EmailTemplateTable from 'containers/EmailTemplate/emailTemplateTable';
import {
  queryTemplateAction,
  deleteItemByIdAction,
  setFormMethodAction,
  setIdAction,
  setKeywordsAction,
} from 'containers/EmailTemplate/actions';
import { POST, PUT } from 'utils/constants';
import { Breadcrumb, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { checkPermissionForComponent } from 'utils/permission';
import { PlusOutlined } from '@ant-design/icons';

const key = 'emailTemplate';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  limit: makeLimitSelector(),
  isLoading: makeIsLoadingSelector(),
  user: makeLoggedInUserSelector(),
});

const CreateRoutePermission = {
  resource: 'emailTemplates',
  method: POST,
  path: '/email-templates',
};

const EmailTemplate = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [createEmailTemplate, setCreateEmailTemplate] = useState(false);
  const [editEmailTemplate, setEditEmailTemplate] = useState(false);

  const { pageNumber, limit, isLoading, user } = useSelector(stateSelector);
  const loadTemplates = () => dispatch(queryTemplateAction());
  const onchangeFormMethod = (formMethod) =>
    dispatch(setFormMethodAction(formMethod));
  const onKeywordChange = (keywords) =>
    dispatch(setKeywordsAction(keywords)) && loadTemplates();
  const onCreate = () => {
    onchangeFormMethod(POST);
    setCreateEmailTemplate(true);
  };
  const onEdit = (updateId) => {
    dispatch(setIdAction(updateId));
    onchangeFormMethod(PUT);
    setEditEmailTemplate(true);
  };

  const onDelete = (deleteId) => dispatch(deleteItemByIdAction(deleteId));

  useEffect(() => {
    loadTemplates();
  }, [pageNumber, limit]);

  return (
    <>
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <div className="truthy-breadcrumb">
        <h2>
          <FormattedMessage {...messages.listTitle} />
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/" className="links">
              <FormattedMessage {...messages.dashboardTitle} />
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="current active">
            <FormattedMessage {...messages.listTitle} />
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="truthy-content-header">
        <div className="d-flex">
          <div>
            {checkPermissionForComponent(user.role, CreateRoutePermission) ? (
              <Button type="primary" onClick={onCreate}>
                <PlusOutlined /> <FormattedMessage {...messages.addLabel} />
              </Button>
            ) : null}
          </div>
          <div className="d-flex ml-auto search-wrap">
            <SearchInput isLoading={isLoading} onSearch={onKeywordChange} />
          </div>
        </div>
      </div>

      <div className="truthy-table ">
        <EmailTemplateTable
          onCreate={onCreate}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <CreateEmailTemplateModal
        visible={createEmailTemplate}
        onCancel={() => setCreateEmailTemplate(false)}
      />
      <EditEmailTemplateModal
        visible={editEmailTemplate}
        onCancel={() => setEditEmailTemplate(false)}
      />
    </>
  );
};

export default EmailTemplate;
