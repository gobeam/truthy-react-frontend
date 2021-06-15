export const BASE_URL = process.env.REACT_APP_API_BASE_URI;
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URI}`;
const AUTH_PATH = '/auth/login';
const PROFILE_PATH = '/auth/profile';
const LOGOUT_PATH = '/logout';

export default class ApiEndpoint {
  static getBasePath = () => `${API_BASE_URL}`;

  static getLoginPath = () => `${API_BASE_URL + AUTH_PATH}`;

  static getProfilePath = () => `${API_BASE_URL + PROFILE_PATH}`;

  static getLogoutPath = () => `${API_BASE_URL + LOGOUT_PATH}`;

  static getRegisterPath = () => `${API_BASE_URL}/auth/register`;

  static getRefreshTokenPath = () => `${API_BASE_URL}/refresh`;

  /**
   * Make API payload
   * @param method
   * @param payload
   * @param contentType
   * @returns {{headers: {}, method: *}}
   */
  static makeApiPayload = (method, payload = null, contentType = null) => {
    const jsonPayload = {
      method,
      headers: {},
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

  /**
   * make login request payload
   * @param email
   * @param password
   * @param refresh
   * @param refreshToken
   * @returns {{client_secret: *, client_id: *}}
   */
  static getLoginPayload = (
    email,
    password,
    refresh = false,
    refreshToken = null,
  ) => {
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
