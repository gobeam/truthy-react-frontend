/*
 *
 * UserAccount reducer
 *
 */
import produce from 'immer';
import {
  SET_PAGE_SIZE,
  ADD_VALIDATION_ERROR,
  SET_LIMIT,
  ASSIGN_REFRESH_TOKEN_LIST,
  ASYNC_END,
  ASYNC_START,
  CLEAR_FORM,
  INITIATE_CLEAN,
  SET_FORM_VALUES,
  SET_INITIAL_VALUES,
} from 'containers/UserAccount/constants';

const EmptyFormField = {
  email: '',
  username: '',
  name: '',
  contact: '',
  address: '',
};

export const initialState = {
  initialValues: EmptyFormField,
  formValues: {},
  limit: 5,
  pageSize: 1,
  isLoading: false,
  initiateClean: false,
  errors: [],
  tokenList: {
    results: [],
    pageSize: 10,
    currentPage: 0,
    totalItems: 0,
    next: 0,
    previous: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const userPageReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_LIMIT:
      draft.limit = action.limit;
      break;
    case INITIATE_CLEAN:
      draft.initiateClean = true;
      break;
    case ASSIGN_REFRESH_TOKEN_LIST:
      draft.tokenList = action.tokenList;
      break;
    case SET_INITIAL_VALUES:
      draft.initialValues = action.initialValues;
      break;
    case SET_PAGE_SIZE:
      draft.pageSize = action.pageSize;
      break;
    case SET_FORM_VALUES:
      draft.formValues = action.formValues;
      break;
    case ADD_VALIDATION_ERROR:
      draft.errors = action.errors;
      break;
    case ASYNC_START:
      draft.isLoading = true;
      break;
    case ASYNC_END:
      draft.isLoading = false;
      break;
    case CLEAR_FORM:
      draft.initialValues = EmptyFormField;
      draft.formValues = {};
      draft.errors = [];
      draft.isLoading = false;
      draft.initiateClean = false;
      break;
  }
}, initialState);

export default userPageReducer;
