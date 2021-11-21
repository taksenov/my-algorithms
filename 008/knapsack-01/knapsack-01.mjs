/**
 * Knapsack
 *
 * ```
 * node --max-old-space-size=256 ./008/knapsack-01/knapsack-01.mjs < ./008/knapsack-01/test-data.txt
 * ```
 */
import { timeDiff } from '../../js-utils/debug/debug.mjs';
import { assert } from '../../js-utils/assert/assert.mjs';

// VARS
let inputStrings = '';

let list = [];
let numbers = 0;
let maxWeight = 0;

/**
 * Возвращает массу для наиболее эффективно заполненного рюкзака
 *
 * @param {Array} arr Массив данных о весах.
 * @param {number} len Количество.
 * @param {number} capacity Вместимость.
 * @return {number} Масса в рюкзаке.
 */
const knapsack = (arr, len, capacity) => {
  let F = Array(capacity + 1).fill(0);
  F[0] = 1;
  let newF = [...F];

  for (let j = 0; j <= len; j++) {
    for (let i = arr[j]; i <= capacity; i++) {
      if (F[i - arr[j]] === 1) {
        newF[i] = 1;
      }
    }
    F = [...newF];
  }

  let res = capacity;
  while (F[res] === 0) {
    res -= 1;
  }
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
  res = knapsack(list, numbers, maxWeight);

  // OUTPUT
  process.stdout.write(String(res));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log(`Результат: ${assert(String(res), '7419') ? 'SUCCES' : 'FAILURE'}`);
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};

// RUNTIME ------
// STDIN
process.stdin.on('data', (data) => {
  inputStrings += data;

  const arr = inputStrings.split('\n');
  const [strOne, strTwo] = arr.filter(Boolean);
  const inputs = strOne.split(' ').map((i) => Number(i));
  [maxWeight, numbers] = inputs;
  list = strTwo.split(' ').map((i) => Number(i));

  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});
