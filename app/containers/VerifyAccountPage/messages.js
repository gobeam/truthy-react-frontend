/*
 * VerifyAccount Messages
 *
 * This contains all the text for the VerifyAccount container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.VerifyAccount';

export default defineMessages({
  activated: {
    id: `${scope}.activated`,
    defaultMessage: 'Account activated successfully, please login to continue!',
  },
  invalidVerification: {
    id: `${scope}.invalidVerification`,
    defaultMessage: 'Invalid verification link!',
  },
});
