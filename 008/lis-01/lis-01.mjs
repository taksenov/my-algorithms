/**
 * Count Sort
 *
 * ```
 * node --max-old-space-size=256 ./008/lis-01/lis-01.mjs < ./008/lis-01/test-data.txt
 * ```
 * IDEA: For O(n*logn) see https://cp-algorithms.com/sequences/longest_increasing_subsequence.html#toc-tgt-9
 */
import { timeDiff } from '../../js-utils/debug/debug.mjs';
import { assert } from '../../js-utils/assert/assert.mjs';

// VARS
let inputStrings = '';

let list = [];

/**
 * Условие: каждый элемент больше предыдущего
 *
 * @param {number} prev Предыдущий элемент.
 * @param {number} current Текущий элемент.
 * @return {boolean} Соотвествует условию или нет.
 */
const increaseCondition = (prev, current) => prev < current;

/**
 * Условие: каждый элемент делится на предыдущий без остатка
 *
 * @param {number} prev Предыдущий элемент.
 * @param {number} current Текущий элемент.
 * @return {boolean} Соотвествует условию или нет.
 */
const withoutDivRemainderCondition = (prev, current) => current % prev === 0;

/**
 * Возвращает длину наибольшей подпоследовательности по условию
 *
 * @param {Array} arr Массив данных.
 * @param {Func} condition Условие.
 * @return {number} Искомая длина.
 */
const LISBottomUp = (arr, condition) => {
  const n = arr.length;
  let arrD = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    arrD[i] = 1;
    for (let j = 0; j <= i - 1; j++) {
      if (condition(arr[j], arr[i]) && arrD[j] + 1 > arrD[i]) {
        arrD[i] = arrD[j] + 1;
      }
    }
  }

  let res = 0;
  for (let idx = 0; idx < n; idx++) {
    res = Math.max(res, arrD[idx]);
  }

  // DEBUG
  // console.log('🚀 ~ file: lis-01.mjs ~ line 46 ~ LISBottomUp ~ arrD', arrD);

  return res;
};

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let res = 0;

  // CALCULATION
  res = LISBottomUp(list, withoutDivRemainderCondition);

  // OUTPUT
  process.stdout.write(String(res));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log(`Результат: ${assert(String(res), '3') ? 'SUCCES' : 'FAILURE'}`);
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};

// RUNTIME ------
// STDIN
process.stdin.on('data', (data) => {
  inputStrings += data;

  const arr = inputStrings.split('\n');
  const [, ...rest] = arr.filter(Boolean);
  const points = rest.pop();
  list = points.split(' ').map((i) => Number(i));

  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});
