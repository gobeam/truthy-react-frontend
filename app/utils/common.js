export default class Common {
  getParameterByName = (name, url) => {
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

export function getFormattedFeedDate(d) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const then = new Date(d);
  then.setHours(0, 0, 0, 0);
  const day = Math.round((now - then) / 8.64e7);
  switch (day) {
    case 0:
      return 'Today';
    case 1:
      return 'Yesterday';
    default:
      return `${day} days ago`;
  }
}
