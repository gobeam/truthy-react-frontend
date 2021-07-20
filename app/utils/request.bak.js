import { store } from 'store';
import { SHOW_SNACK_MESSAGE } from 'containers/SnackMessage/constants';
import uuid from 'react-uuid';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
const parseJSON = (response) => {
  if (response.status === 204 || response.status === 205) {
    return {
      statusCode: response.status,
    };
  }
  return response.json();
};

const checkError = (response) => {
  const statusCode = Number(response.statusCode);
  if (statusCode >= 200 && statusCode < 300) {
    return response;
  }
  if ([422].includes(statusCode)) {
    return response;
  }
  if ([401, 403, 429].includes(statusCode)) {
    store.dispatch({
      type: SHOW_SNACK_MESSAGE,
      snack: {
        type: 'error',
        message: response.message,
        id: uuid(),
      },
    });
  }
  const error = new Error(response.message);
  error.response = response;
  throw error;
};

// /**
//  * Checks if a network request came back fine, and throws an error if not
//  *
//  * @param  {object} response   A response from a network request
//  *
//  * @return {object|undefined} Returns either the response, or throws an error
//  */
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   // if (response.status === 401) {
//   //   const urlLastSegment = window.location.pathname.split('/').pop();
//   //   // if not in login page redirect to login page
//   //   const publicLinks = ['', 'login', 'register', 'forgot-password'];
//   //   if (!publicLinks.includes(urlLastSegment)) {
//   //     window.location.href = `/login?path=${window.location.pathname}`;
//   //   }
//   // }
//   // send validation and forbidden request response
//
//   if ([429, 422, 403].includes(response.status)) {
//     return response;
//   }
//   if (response.status === 401) {
//     store.dispatch({
//       type: SHOW_SNACK_MESSAGE,
//       snack: {
//         type: 'error',
//         message: 'test message for err',
//         id: uuid(),
//       },
//     });
//   }
//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

/**
 * Requests a URL, returning a promise
 * @param url
 * @param options
 * @returns {Promise<Response>}
 */
const requestBak = (url, options) =>
  fetch(url, {
    ...options,
    credentials: 'include',
  })
    // .then(checkStatus)
    .then(parseJSON)
    .then(checkError);

export default requestBak;
