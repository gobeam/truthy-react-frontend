import { createSelector } from 'reselect';
import { initialState } from 'containers/EmailTemplateModule/reducer';

/**
 * Direct selector to the EmailTemplateModule state domain
 */

const selectEmailTemplateModuleDomain = (state) =>
  state.emailTemplate || initialState;

/**
 * Other specific selectors
 */

const makeIsLoadingSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.isLoading,
  );

const makeKeywordsSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.keywords,
  );

const makeIsFormPageSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.formPage,
  );

const makeFormMethodSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.formMethod,
  );

const makeUpdateIdSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.updateId,
  );

const makeFormTitleSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.formTitle,
  );

const makeTemplateTitleSelector = () =>
  createSelector(selectEmailTemplateModuleDomain, (substate) => substate.title);

const makeTemplateBodySelector = () =>
  createSelector(selectEmailTemplateModuleDomain, (substate) => substate.body);

const makeTemplateEditedBodySelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.editedBody,
  );

const makeSenderSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.sender,
  );

const makeSubjectSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.subject,
  );

const makePageNumberSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.pageNumber,
  );

const makeLimitSelector = () =>
  createSelector(selectEmailTemplateModuleDomain, (substate) => substate.limit);

const makeTemplatesSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.templates,
  );

const makeErrorSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.errors,
  );

export {
  makeLimitSelector,
  makeTemplateEditedBodySelector,
  makeTemplateTitleSelector,
  makeTemplateBodySelector,
  makeSenderSelector,
  makeKeywordsSelector,
  makeUpdateIdSelector,
  makeFormTitleSelector,
  makeIsFormPageSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeTemplatesSelector,
  makeSubjectSelector,
};
