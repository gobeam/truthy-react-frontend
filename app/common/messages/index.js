/**
 * Common Messages
 */

import { defineMessages } from 'react-intl';

export const scope = 'common.messages';

export default defineMessages({
  success: {
    id: `${scope}.success`,
    defaultMessage: `Success`,
  },
  invalidRefresh: {
    id: `${scope}.invalidRefresh`,
    defaultMessage: `Session out`,
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: `Submit`,
  },
  complete: {
    id: `${scope}.complete`,
    defaultMessage: `Complete`,
  },
  sourceCode: {
    id: `${scope}.sourceCode`,
    defaultMessage: `Source Code`,
  },
  hideCode: {
    id: `${scope}.hideCode`,
    defaultMessage: `Hide Code`,
  },
  showCode: {
    id: `${scope}.showCode`,
    defaultMessage: `Show Code`,
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: `Cancel`,
  },
  unauthorized: {
    id: `${scope}.unauthorized`,
    defaultMessage: `Invalid credentials`,
  },
  forbidden: {
    id: `${scope}.forbidden`,
    defaultMessage: `You don't have access for this action, please contact admin for further details.`,
  },
  danger: {
    id: `${scope}.danger`,
    defaultMessage: `Error`,
  },
  warning: {
    id: `${scope}.warning`,
    defaultMessage: `Warning`,
  },
  editLabel: {
    id: `${scope}.editLabel`,
    defaultMessage: `Edit`,
  },
  viewLabel: {
    id: `${scope}.viewLabel`,
    defaultMessage: `View`,
  },
  removeLabel: {
    id: `${scope}.removeLabel`,
    defaultMessage: `Remove`,
  },
  info: {
    id: `${scope}.info`,
    defaultMessage: `Info`,
  },
  primary: {
    id: `${scope}.primary`,
    defaultMessage: `Message`,
  },
  addSuccess: {
    id: `${scope}.addSuccess`,
    defaultMessage: `Data added successfully!`,
  },
  updateSuccess: {
    id: `${scope}.updateSuccess`,
    defaultMessage: `Data updated successfully!`,
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please try again in a moment!',
  },
});
