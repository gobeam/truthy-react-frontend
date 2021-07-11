import { FormattedMessage } from 'react-intl';
import commonMessage from 'common/messages';
import React from 'react';
import { checkIfStrongPassword } from 'common/validator';

export const rules = {
  email: [
    {
      type: 'email',
      message: <FormattedMessage {...commonMessage.validEmailRequired} />,
    },
    {
      required: true,
      whitespace: true,
      message: <FormattedMessage {...commonMessage.emailRequired} />,
    },
  ],
  password: [
    {
      required: true,
      whitespace: true,
      message: <FormattedMessage {...commonMessage.passwordRequired} />,
    },
    {
      validator: checkIfStrongPassword,
    },
  ],
  username: [
    {
      required: true,
      whitespace: true,
      message: <FormattedMessage {...commonMessage.usernameRequired} />,
    },
  ],
  name: [
    {
      required: true,
      whitespace: true,
      message: <FormattedMessage {...commonMessage.nameRequired} />,
    },
  ],
};
