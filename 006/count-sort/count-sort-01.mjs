/**
 * Count Sort
 *
 * ```
 * node --max-old-space-size=256 ./006/count-sort/count-sort-01.mjs < ./006/count-sort/test-data.txt
 * ```
 */
import { timeDiff } from '../../js-utils/debug/debug.mjs';
import { assert } from '../../js-utils/assert/assert.mjs';

// VARS
let inputStrings = '';

let list = [];

const countSort = (arr) => {
  const n = arr.length;
  let M = 10;
  let arrB = Array(M + 1).fill(0);
  let arrAs = Array(n).fill(0);

  for (let idx = 0; idx < n; idx++) {
    arrB[arr[idx]] += 1;
  }
  for (let idx = 1; idx <= M; idx++) {
    arrB[idx] += arrB[idx - 1];
  }
  for (let idx = n - 1; idx >= 0; idx--) {
    arrAs[arrB[arr[idx]] - 1] = arr[idx];
    arrB[arr[idx]] -= 1;
  }

  return arrAs;
};

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let res = [];

  // CALCULATION
  res = countSort(list);

  // OUTPUT
  process.stdout.write(res.join(' '));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log(`Результат: ${assert(res.join(' '), '2 2 3 9 9') ? 'SUCCES' : 'FAILURE'}`);
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
