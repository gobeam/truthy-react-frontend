import axios from 'axios';
import { logoutAction, otpUnVerifiedAction } from 'containers/App/actions';
import { SHOW_SNACK_MESSAGE } from 'containers/SnackMessage/constants';
import { getItem } from 'hooks/useCookie';
import uuid from 'react-uuid';
import { store } from 'store';
import { StatusCodesList } from 'utils/constants';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URI,
});

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (
      err.response.data?.code === StatusCodesList.TokenExpired &&
      getItem('ExpiresIn')
    ) {
      // eslint-disable-next-line no-underscore-dangle
      if (!originalConfig._retry) {
        // eslint-disable-next-line no-underscore-dangle
        originalConfig._retry = true;
        try {
          await client.post('/refresh', {}, { withCredentials: true });
          return client(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      return {
        ...originalConfig,
        cancelToken: new axios.CancelToken((cancel) =>
          cancel('Cancel repeated request'),
        ),
      };
    }
    if (
      err.response.data?.code === StatusCodesList.TokenExpired &&
      !getItem('ExpiresIn')
    ) {
      store.dispatch(logoutAction());
    }

    return Promise.reject(err);
  },
);

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  const onSuccess = (response) => response.data;
  const onError = (error) => {
    if (error.response?.data) {
      // Error codes Array
      const errorCodesArray = [
        StatusCodesList.InvalidRefreshToken,
        StatusCodesList.RefreshTokenExpired,
        StatusCodesList.TokenExpired,
      ];
      // Check if otp required error code is in the array
      if (error.response.data.code === StatusCodesList.OtpRequired) {
        return store.dispatch(otpUnVerifiedAction());
      }
      // // Check if token expired error code is in the array
      // if (error.response.data.code === StatusCodesList.TokenExpired) {
      //   const { logoutRunning } = store.getState().global;
      //   if (!logoutRunning && !getItem('ExpiresIn')) {
      //     return store.dispatch(logoutAction());
      //   }
      // }
      if (errorCodesArray.includes(error.response.data.code)) {
        return store.dispatch({
          type: SHOW_SNACK_MESSAGE,
          snack: {
            type: 'error',
            message: error.response.data.message,
            id: uuid(),
          },
        });
      }
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
