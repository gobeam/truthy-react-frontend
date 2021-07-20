import messages from 'common/messages';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export const checkIfStrongPassword = (rule, value, callback) => {
  const re =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
  if (re.test(value)) {
    callback();
  } else {
    callback(<FormattedMessage {...messages.weakPassword} />);
  }
};
