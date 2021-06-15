export default class Common {
  static getParameterByName = (name, url) => {
    const defaultUri = '/dashboard';
    // eslint-disable-next-line no-param-reassign
    if (!url) url = window.location.href;
    // eslint-disable-next-line no-param-reassign,no-useless-escape
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    const uri = decodeURIComponent(results[2].replace(/\+/g, ' '));
    const exceptUri = ['/', '/login'];
    if (exceptUri.includes(uri)) {
      return defaultUri;
    }
    return uri;
  };
}
