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

const key = 'emailTemplate';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  limit: makeLimitSelector(),
  isLoading: makeIsLoadingSelector(),
});

const EmailTemplate = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [createEmailTemplate, setCreateEmailTemplate] = useState(false);
  const [editEmailTemplate, setEditEmailTemplate] = useState(false);

  const { pageNumber, limit, isLoading } = useSelector(stateSelector);
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
      <SearchInput isLoading={isLoading} onSearch={onKeywordChange} />
      <CreateEmailTemplateModal
        visible={createEmailTemplate}
        onCancel={() => setCreateEmailTemplate(false)}
        onCreate={() => setCreateEmailTemplate(false)}
      />
      <EditEmailTemplateModal
        visible={editEmailTemplate}
        onCancel={() => setEditEmailTemplate(false)}
        onCreate={() => setEditEmailTemplate(false)}
      />
      <EmailTemplateTable
        onCreate={onCreate}
        onEdit={onEdit}
        onModifyPermission={() => {}}
        onDelete={onDelete}
      />
    </>
  );
};

export default EmailTemplate;
