export const APP_URL = process.env.REACT_APP_URI;
export const BASE_URL = process.env.REACT_APP_API_BASE_URI;
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URI}`;
const AUTH_PATH = '/auth/login';
const PROFILE_PATH = '/auth/profile';
const LOGOUT_PATH = '/logout';

export default class ApiEndpoint {
  getBasePath = () => `${API_BASE_URL}`;

  getLoginPath = () => `${API_BASE_URL + AUTH_PATH}`;

  getProfilePath = () => `${API_BASE_URL + PROFILE_PATH}`;

  getLogoutPath = () => `${API_BASE_URL + LOGOUT_PATH}`;

  getRegisterPath = () => `${API_BASE_URL}/auth/register`;

  makeApiPayload = (
    method,
    token = null,
    payload = null,
    contentType = null,
  ) => {
    const jsonPayload = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (!contentType) {
      jsonPayload.headers.Accept = 'application/json';
      jsonPayload.headers['Content-Type'] = 'application/json';
    }
    if (payload !== null) {
      jsonPayload.body = contentType ? payload : JSON.stringify(payload);
    }
    return jsonPayload;
  };

  getLoginPayload = (email, password, refresh = false, refreshToken = null) => {
    const jsonPayload = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    };
    if (refresh) {
      jsonPayload.grant_type = 'refresh_token';
      jsonPayload.refresh_token = refreshToken;
    } else {
      jsonPayload.grant_type = 'password';
      jsonPayload.username = email;
      jsonPayload.password = password;
      jsonPayload.scope = '*';
    }
    return jsonPayload;
  };
}
