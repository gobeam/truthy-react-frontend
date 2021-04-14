import { createSelector } from 'reselect';
import { initialState } from 'containers/ProfilePage/reducer';

const selectProfilePageDomain = (state) => state.profilePage || initialState;

const makeDobSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.dob);

const makeImageSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.image);

const makeProfileImageSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.profile_image);

const makeEmailSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.email);

const makeNameSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.name);

const makePasswordSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.password);

const makeConfirmPasswordSelector = () =>
  createSelector(
    selectProfilePageDomain,
    (substate) => substate.confirm_password,
  );

const makeErrorSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.errors);

const makeIsLoadingSelector = () =>
  createSelector(selectProfilePageDomain, (substate) => substate.isLoading);

export {
  makeEmailSelector,
  makeNameSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
  makeConfirmPasswordSelector,
  makePasswordSelector,
  makeDobSelector,
  makeImageSelector,
  makeProfileImageSelector,
};
