/**
 * Count Sort
 *
 * ```
 * node --max-old-space-size=256 ./008/lis-02/lis-02.mjs < ./008/lis-02/test-data.txt
 * ```
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
 * Условие: каждый элемент меньше либо равен предыдущего
 *
 * @param {number} prev Предыдущий элемент.
 * @param {number} current Текущий элемент.
 * @return {boolean} Соотвествует условию или нет.
 */
const decreaseConditionStrong = (prev, current) => prev >= current;

/**
 * Условие: каждый элемент меньше предыдущего
 *
 * @param {number} prev Предыдущий элемент.
 * @param {number} current Текущий элемент.
 * @return {boolean} Соотвествует условию или нет.
 */
const decreaseCondition = (prev, current) => prev > current;

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
 * @param {Arrray} arr Массив данных.
 * @param {Func} condition Условие.
 * @return {number} Искомая длина.
 */
const LISBottomUp = (arr, condition) => {
  const n = arr.length;
  if (n === 1) {
    return { ans: 1, arrPrev: [[1, 0, arr[0]]] };
  }

  let inf = Infinity;
  let arrL = Array(n + 1).fill(-inf);
  arrL[0] = inf;
  let arrPrev = [];

  for (let i = 0; i < n; i++) {
    let left = 0;
    let right = n;

    while (right - left > 1) {
      let middle = Math.floor((left + right) / 2);

      if (condition(arr[i], arrL[middle])) {
        right = middle;
      } else {
        left = middle;
      }
    }
    arrPrev.push([right, i, arr[i]]);
    arrL[right] = arr[i];
  }

  console.log('🚀 ~ file: lis-02.mjs ~ line 89 ~ LISBottomUp ~ arrL', arrL);
  let res = n;
  while (arrL[res] === -Infinity) {
    res -= 1;
  }

  return { ans: res, arrPrev };
};

/**
 * Восстанавливает индексы элементов последовательности
 *
 * @param {object} obj
 * @param {object} obj.ans Длина последовательности.
 * @param {object} obj.arrPrev Массив предков.
 * @return {Array} Массив индексов.
 */
const restoreIndexes = ({ ans, arrPrev }) => {
  console.log('🚀 ~ file: lis-02.mjs ~ line 104 ~ restoreIndexes ~ arrPrev', arrPrev);
  console.log('🚀 ~ file: lis-02.mjs ~ line 104 ~ restoreIndexes ~ ans', ans);

  let res = [];
  let count = ans;
  for (let index = arrPrev.length - 1; index >= 0; index--) {
    if (count === 0) {
      break;
    }

    if (arrPrev[index][0] === count) {
      res.push(arrPrev[index][1] + 1);
      count--;
    }
  }

  console.log('🚀 ~ file: lis-02.mjs ~ line 123 ~ restoreIndexes ~ res', res);
  return res.reverse();
};

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let res = [];
  console.log('🚀 ~ file: lis-02.mjs ~ line 134 ~ main ~ list', list);

  // CALCULATION
  const lisData = LISBottomUp(list, decreaseCondition);
  res = restoreIndexes(lisData);

  // OUTPUT
  process.stdout.write(String(lisData.ans));
  process.stdout.write('\n');
  process.stdout.write(res.join(' '));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  let first = '4';
  let second = '1 3 4 5';
  console.log(
    `Результат: === ${first} ? ${assert(String(lisData.ans), first) ? 'SUCCES' : 'FAILURE'}`,
  );
  console.log(`Результат: === ${second} ? ${assert(res.join(' '), second) ? 'SUCCES' : 'FAILURE'}`);
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
