/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'helpers.ValidationMessage';

export default defineMessages({
  isNotEmpty: {
    id: `${scope}.isNotEmpty`,
    defaultMessage: `This field is required!`,
  },
  'Email already taken': {
    id: `${scope}.emailTaken`,
    defaultMessage: `Email already taken!`,
  },
  isNotString: {
    id: `${scope}.isString`,
    defaultMessage: `This field must be string!`,
  },
  isNotInt: {
    id: `${scope}.isNotInt`,
    defaultMessage: `This field is not a valid number!`,
  },
  isNotEmail: {
    id: `${scope}.isNotEmail`,
    defaultMessage: `This field is not valid email!`,
  },
  isNotSelected: {
    id: `${scope}.isNotSelected`,
    defaultMessage: `This field is must be selected!`,
  },
  isNotPositive: {
    id: `${scope}.isNotPositive`,
    defaultMessage: `This field is must be positive number!`,
  },
  isNotTrue: {
    id: `${scope}.isNotTrue`,
    defaultMessage: `This field must be accepted!`,
  },
  isNotAddress: {
    id: `${scope}.isNotAddress`,
    defaultMessage: `This field is not valid ethereum address!`,
  },
});
