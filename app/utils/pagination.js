export function pagination(current, totalItem, pageSize) {
  const last = Math.ceil(totalItem / pageSize);
  const start = Math.max(getPageStart(pageSize, current - 1), 0);
  const end = Math.min(getPageStart(pageSize, current), totalItem);
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l = 0;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return {
    totalPages: last,
    pages: rangeWithDots,
    start: start + 1,
    end,
  };
}

function getPageStart(pageSize, pageNr) {
  return pageSize * pageNr;
}
