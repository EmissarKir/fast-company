export const getNoun = (number, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

export const createPages = (arr1, size) => {
  let pages = [];
  for (let i = 0; i < arr1.length; i += size) {
    let elem = arr1.slice(i, i + size);
    pages.push(elem);
  }
  return pages;
};
export const createNumbers = (length) =>
  Array.from({ length }, (v, k) => k + 1);
