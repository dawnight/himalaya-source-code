// 在某个位置是否以某个字符串开始
export const startsWith = (str, searchString, position) => {
  return str.substr(position, searchString.length) === searchString;
};

// 在某个位置是否以某个字符串结束
export const endsWith = (str, searchString, position) => {
  const index = (position || str.length) - searchString.length;
  const lastIndex = str.lastIndexOf(searchString, index);
  return lastIndex !== -1 && lastIndex === index;
};

// 判断一个数字是否是 NaN
export const isRealNaN = x => typeof x === 'number' && isNaN(x);

// 以某个位置开始，字符串是否含有某个字符串
export const stringInclude = (str, searchString, position) => {
  return str.indexOf(searchString, position) !== -1;
};

// 以某个位置开始，数组是否含有某个元素
export const arrayIncludes = (array, searchElement, position) => {
  return array.indexOf(searchElement, position) > -1;
};
