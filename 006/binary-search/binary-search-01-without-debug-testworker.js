// VARS
let inputStrings = '';
let aNumsArr = [];
let bNumsArr = [];

/**
 * Бинарный поиск на упорядоченном массиве
 *
 * @param {Array} arr упорядоченный массив
 * @param {number} val искомое значение
 * @return {number} индекс искомого значения в массиве
 */
const binarySearch = (arr, val) => {
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    const m = Math.floor(l + (r - l) / 2);
    const arrM = Number(arr[m]);

    if (arrM === val) {
      return m + 1;
    }
    if (arrM > val) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return -1;
};
/**
 * Main!
 */
const main = () => {
  let res = [];

  // CALCULATION
  bNumsArr.forEach((element) => {
    res.push(binarySearch(aNumsArr, Number(element)));
  });

  // OUTPUT
  process.stdout.write(res.join(' '));
};

// STDIN
process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    inputStrings += chunk;
  }
});

process.stdin.on('end', () => {
  const arr = inputStrings.split('\n');
  const [firsStr, secondStr] = arr;
  [, ...aNumsArr] = firsStr.split(' ');
  [, ...bNumsArr] = secondStr.split(' ');

  main();
});
