export const BASE_URL = process.env.REACT_APP_API_BASE_URI;
const AUTH_PATH = '/auth/login';
const PROFILE_PATH = '/auth/profile';
const LOGOUT_PATH = '/logout';

export default class ApiEndpoint {
  static getLoginPath = () => AUTH_PATH;

  static getProfilePath = () => PROFILE_PATH;

  static getLogoutPath = () => LOGOUT_PATH;

  static getRegisterPath = () => `/auth/register`;

  static getRefreshTokenPath = () => `/refresh`;

  /**
   * Make API payload
   * @param url
   * @param method
   * @param payload
   * @param contentType
   * @returns {{headers: {}, method: *}}
   */
  static makeApiPayload = (url, method, payload = null, contentType = null) => {
    const jsonPayload = {
      url,
      method,
      withCredentials: true,
      headers: {},
    };
    if (!contentType) {
      jsonPayload.headers.Accept = 'application/json';
      jsonPayload.headers['Content-Type'] = 'application/json';
      jsonPayload.headers['Content-Type'] = 'application/json';
    } else {
      jsonPayload.headers['Content-Type'] = contentType;
    }
    if (payload !== null) {
      const formData = new FormData();
      switch (jsonPayload.headers['Content-Type']) {
        case 'application/json':
          jsonPayload.data = payload;
          break;
        case 'multipart/form-data':
          // eslint-disable-next-line no-restricted-syntax
          for (const key of Object.keys(payload)) {
            formData.append(key, payload[key]);
          }
          jsonPayload.data = formData;
          break;
        default:
          jsonPayload.data = null;
      }
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
