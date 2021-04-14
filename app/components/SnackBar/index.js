import styled from 'styled-components';

const A = styled.div`
  visibility: ${(props) =>
    props.show ? 'visible' : ''}; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: ${(props) => {
    let color = '#333';
    switch (props.type) {
      case 'primary':
        color = '#333';
        break;
      case 'success':
        color = '#00c853';
        break;
      case 'danger':
      case 'error':
        color = '#c62e21';
        break;
      case 'info':
        color = '#b5c600';
        break;
      default:
        color = '#333';
    }
    return color;
  }}; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 0px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 9999; /* Add a z-index if needed */
  left: 0; /* Center the snackbar */
  right: 0;
  top: 0;
  margin: auto;

  //-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  //animation: fadein 0.5s, fadeout 0.5s 2.5s;

  /* Animations to fade the snackbar in and out */
  @-webkit-keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 30px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 30px;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      top: 30px;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      top: 30px;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
  }
`;

export default A;
