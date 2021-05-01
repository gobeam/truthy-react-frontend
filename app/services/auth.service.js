export default class AuthService {
  checkToken = () => {
    const token = this.getToken();
    return !!token;
  };

  setTokenPayload = (payload) =>
    localStorage.setItem('accessToken', payload.accessToken);

  unSetTokenPayload = () => localStorage.removeItem('accessToken');

  getToken = () => localStorage.getItem('accessToken');
}
