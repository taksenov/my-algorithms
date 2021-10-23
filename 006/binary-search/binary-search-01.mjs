/**
 * Binary Search
 *
 * ```
 * node --max-old-space-size=256 ./006/binary-search/binary-search-01.mjs < ./006/binary-search/test-data.txt
 * ```
 */
import { timeDiff } from '../../js-utils/debug/debug.mjs';
import { assert } from '../../js-utils/assert/assert.mjs';

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
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let res = [];

  // INPUT
  console.log('🚀 ~ aNumsArr=', aNumsArr);
  console.log('🚀 ~ bNumsArr=', bNumsArr);

  // CALCULATION
  bNumsArr.forEach((element) => {
    res.push(binarySearch(aNumsArr, Number(element)));
  });

  // OUTPUT
  process.stdout.write(res.join(' '));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log(
    `Результат: ${assert(res.join(' '), '3 1 -1 1 -1') ? 'SUCCES' : 'FAILURE'}`,
  );
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};

// RUNTIME ------
// STDIN
process.stdin.on('data', (data) => {
  inputStrings += data;

  const arr = inputStrings.split('\n');
  const [firsStr, secondStr] = arr;
  [, ...aNumsArr] = firsStr.split(' ');
  [, ...bNumsArr] = secondStr.split(' ');

  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});
