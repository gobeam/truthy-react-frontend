import axios from 'axios';
import { store } from 'store';
import { SHOW_SNACK_MESSAGE } from 'containers/SnackMessage/constants';
import uuid from 'react-uuid';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URI,
});

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  const onSuccess = (response) =>
    // console.debug('Request Successful!', response);
    response.data;
  const onError = (error) => {
    // console.error('Request Failed:', error.config);
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.error('Status:', error.response.status);
      // console.error('Data:', error.response.data);
      // console.error('Headers:', error.response.headers);
      if ([401, 403, 429].includes(error.response.status)) {
        store.dispatch({
          type: SHOW_SNACK_MESSAGE,
          snack: {
            type: 'error',
            message: error.response.data.message,
            id: uuid(),
          },
        });
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      // console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
