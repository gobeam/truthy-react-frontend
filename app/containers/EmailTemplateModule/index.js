/**
 *
 * EmailTemplateModule
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/EmailTemplateModule/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/EmailTemplateModule/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/EmailTemplateModule/messages';
import EmailTemplateList from 'components/EmailTemplatePage/List';
import EmailTemplateForm from 'components/EmailTemplatePage/Form';
import {
  makeIsFormPageSelector,
  makeLimitSelector,
  makePageNumberSelector,
} from 'containers/EmailTemplateModule/selectors';
import { queryTemplateAction } from 'containers/EmailTemplateModule/actions';
import { makeLoggedInUserSelector } from 'containers/App/selectors';

const key = 'emailTemplate';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  user: makeLoggedInUserSelector(),
  formPage: makeIsFormPageSelector(),
  limit: makeLimitSelector(),
});

const EmailTemplateModule = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { pageNumber, formPage, limit } = useSelector(stateSelector);
  const loadTemplates = () => dispatch(queryTemplateAction());

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
      {!formPage ? <EmailTemplateList /> : <EmailTemplateForm />}
    </>
  );
};

export default EmailTemplateModule;
