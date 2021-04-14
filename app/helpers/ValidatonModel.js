class Validator {
  validate = (value, rules, key) => {
    const self = this;
    let msg = null;
    let endMessage = '';
    rules.forEach((rule) => {
      msg = self[rule](value);
      if (msg) {
        endMessage = unCamelCase(key) + msg;
      }
    });
    return endMessage;
  };

  /**
   * check if value is string
   * @param value
   * @returns {string}
   */
  isString = (value) => {
    if (typeof value === 'string') {
      return '';
    }
    return ' must be string';
  };

  /**
   * Check if value is empty
   * @param value
   * @returns {string}
   */
  isNotEmpty = (value) => {
    if (value !== '' && value !== null && typeof value !== 'undefined') {
      return '';
    }
    return ' cannot be empty';
  };

  /**
   * Check if value i integer
   * @param value
   * @returns {string}
   */
  isInt = (value) => {
    if (!Number.isNaN(value)) {
      return '';
    }
    return ' must be integer';
  };

  /**
   * Check if value i integer in select box
   * @param value
   * @returns {string}
   */
  isIntSelect = (value) => {
    if (!Number.isNaN(value)) {
      return '';
    }
    return ' must be selected';
  };

  /**
   *
   * @param value
   * @returns {string}
   */
  isPositive = (value) => {
    if (value > 0) {
      return '';
    }
    return ' must be positive';
  };

  /** check if value is in email format
   * @param value
   * @returns {string}
   */
  isEmail = (value) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(value).toLowerCase())) {
      return '';
    }
    return ' is not valid';
  };

  /**
   * check if value is true
   * @param value
   * @returns {string}
   */
  isTrue = (value) => {
    if (value) {
      return '';
    }
    return ' must be true';
  };

  /**
   * check if value is valid ethereum address
   * @param value
   * @returns {string}
   */
  isAddress = (value) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(value)) {
      // check if it has the basic requirements of an address
      return ' must be valid ethereum address';
    }
    if (
      /^(0x)?[0-9a-f]{40}$/.test(value) ||
      /^(0x)?[0-9A-F]{40}$/.test(value)
    ) {
      // If it's all small caps or all all caps, return true
      return '';
    }
    return '';
  };
}

/**
 *
 * @param str
 * @returns {*}
 */
const unCamelCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    .replace(/^./, (val) => val.toUpperCase());

export default Validator;
