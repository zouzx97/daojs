import { master } from '../..';

function string2array(str, seg = 1) {
  const arr = [];
  let idxStart = 0;
  let idxEnd = ((str.length - 1) % seg) + 1;

  while (idxStart < str.length) {
    arr.push(parseInt(str.slice(idxStart, idxEnd), 10));
    idxStart = idxEnd;
    idxEnd += seg;
  }

  arr.reverse();
  return arr;
}

function array2string(arr, seg = 1) {
  const padding = '0'.repeat(seg);
  return arr.map((n, i) => {
    if (i === arr.length - 1) {
      return n.toString();
    }
    return (padding + n.toString()).slice(-seg);
  }).reverse().join('');
}

function add(arrA, arrB, seg = 1) {
  const arrResult = [];
  const segPow = 10 ** seg;

  for (let i = 0; i < Math.max(arrA.length, arrB.length); i += 1) {
    const sum = arrA[i] + arrB[i] + (arrResult[i] || 0);
    arrResult[i] = sum % segPow;
    if (sum > segPow) {
      arrResult[i + 1] = Math.floor(sum / segPow);
    }
  }

  return arrResult;
}

function stringArithmeticFor(proc) {
  return (...args) => {
    const segArg = args.slice(-1)[0];
    const seg = typeof segArg === 'number' ? segArg : 1;
    const strs = typeof segArg === 'number' ? args.slice(0, -1) : args;

    return array2string(proc(...strs.map(str => string2array(str, seg)), seg), seg);
  };
}

master.register({
  string2array,
  array2string,
  add: stringArithmeticFor(add),
});
