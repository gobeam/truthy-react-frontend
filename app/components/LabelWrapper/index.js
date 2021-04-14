/**
 *
 * LabelWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import { PRIMARY_RED } from 'utils/colors';
import { Label } from 'reactstrap';

const LabelWrapper = styled(Label)`
  color: ${(props) => (props.error ? PRIMARY_RED : 'inherit')};
  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: ${(props) => (props.large ? '315px' : '17rem')};
  }
`;

export default LabelWrapper;
