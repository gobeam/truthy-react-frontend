export default class AuthService {
  checkToken = () => {
    const token = this.getToken();
    return !!token;
  };

  setTokenPayload = (payload) => {
    localStorage.setItem('accessToken', payload.accessToken);
    return true;
  };

  unSetTokenPayload = () => {
    localStorage.removeItem('accessToken');
    return true;
  };

  getToken = () => localStorage.getItem('accessToken');
}
