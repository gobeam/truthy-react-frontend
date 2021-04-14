/**
 *
 * ButtonWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import { Button } from 'reactstrap';

const ButtonWrapper = styled(Button)`
  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: ${(props) => (props.large ? '300px' : '272px')};
  }
  &:hover {
    cursor: ${(props) => (props.disabled ? 'none' : 'pointer')};
  }
}

`;

export default ButtonWrapper;
