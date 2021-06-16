import { Validator } from 'helpers/ValidatonModel';

/**
 * Check if error exists
 * @param model
 */
export const checkError = (model) => {
  const err = {};
  Object.keys(model).forEach((key) => {
    const validator = new Validator();
    const msg = validator.validate(
      model[key].value,
      model[key].validator,
      model[key].key || key,
    );

    if (msg.trim()) {
      err[key] = msg;
    }
  });
  return err;
};

export const getParameterByName = (name, url) => {
  /* eslint-disable default-case, no-param-reassign */
  if (!url) url = window.location.href;
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
