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

const makeFormMethodSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.formMethod,
  );

const makeUpdateIdSelector = () =>
  createSelector(selectEmailTemplateModuleDomain, (substate) => substate.id);

const makeTemplateEditedBodySelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.editedBody,
  );

const makePageNumberSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.pageNumber,
  );

const makeLimitSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.pageSize,
  );

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

const makeInitiateCleanFieldSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.initiateClean,
  );

const makeFormValuesSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.formValues,
  );

const makeInitialValuesSelector = () =>
  createSelector(
    selectEmailTemplateModuleDomain,
    (substate) => substate.initialValues,
  );

export {
  makeInitialValuesSelector,
  makeInitiateCleanFieldSelector,
  makeFormValuesSelector,
  makeLimitSelector,
  makeTemplateEditedBodySelector,
  makeKeywordsSelector,
  makeUpdateIdSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeTemplatesSelector,
};
