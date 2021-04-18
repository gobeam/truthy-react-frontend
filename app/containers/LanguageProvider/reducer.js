/*
 *
 * LanguageProvider reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';
import { DEFAULT_LOCALE } from 'i18n';
import { CHANGE_LOCALE } from 'containers/LanguageProvider/constants';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      draft.locale = action.locale;
      break;
    default:
  }
}, initialState);

export default languageProviderReducer;
