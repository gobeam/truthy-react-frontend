const buildQueryString = (keywords, pageNumber, limit) => {
  const queryObj = {
    page: pageNumber > 0 ? pageNumber : 1,
    limit: limit > 0 ? limit : 10,
  };
  if (keywords && keywords.trim().length > 0) {
    queryObj.keywords = keywords;
  }
  return Object.keys(queryObj)
    .map((key) => `${key}=${queryObj[key]}`)
    .join('&');
};

export { buildQueryString };
