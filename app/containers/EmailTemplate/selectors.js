import { createSelector } from 'reselect';
import { initialState } from 'containers/EmailTemplate/reducer';

/**
 * Direct selector to the EmailTemplate state domain
 */

const selectEmailTemplateDomain = (state) =>
  state.emailTemplate || initialState;

/**
 * Other specific selectors
 */

const makeIsLoadingSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.isLoading);

const makeKeywordsSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.formMethod);

const makeUpdateIdSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.id);

const makeTemplateEditedBodySelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.editedBody);

const makePageNumberSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.pageNumber);

const makeLimitSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.pageSize);

const makeTemplatesSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.templates);

const makeErrorSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.errors);

const makeInitiateCleanFieldSelector = () =>
  createSelector(
    selectEmailTemplateDomain,
    (substate) => substate.initiateClean,
  );

const makeFormValuesSelector = () =>
  createSelector(selectEmailTemplateDomain, (substate) => substate.formValues);

const makeInitialValuesSelector = () =>
  createSelector(
    selectEmailTemplateDomain,
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
