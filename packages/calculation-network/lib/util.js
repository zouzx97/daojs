export function isArray(obj) {
  return Object.prototype.toString.apply(obj) === '[object Array]';
}

export function isObject(obj) {
  return Object.prototype.toString.apply(obj) === '[object Object]';
}

export function isString(obj) {
  return Object.prototype.toString.apply(obj) === '[object String]';
}
