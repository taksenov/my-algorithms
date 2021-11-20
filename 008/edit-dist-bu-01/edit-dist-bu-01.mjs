/**
 * EditDistBU
 *
 * ```
 * node --max-old-space-size=256 ./008/edit-dist-bu-01/edit-dist-bu-01.mjs < ./008/edit-dist-bu-01/test-data.txt
 * ```
 */
import { timeDiff } from '../../js-utils/debug/debug.mjs';
import { assert } from '../../js-utils/assert/assert.mjs';

// VARS
let inputStrings = '';

let arrOne = [];
let arrTwo = [];

/**
 * Определяет стоимость замены на основании разницы значений
 *
 * @param {string} a
 * @param {string} b
 * @return {number} Стоимость.
 */
const diff = (a, b) => (a === b ? 0 : 1);

/**
 * Поиск минимума из трех
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number} Минимальное значение.
 */
const minTriad = (a, b, c) => {
  let min = a;

  if (b < min) {
    min = b;
  }
  if (c < min) {
    min = c;
  }

  return min;
};

/**
 * Рассчитывает растояние редактирования
 *
 * @param {Array} arr Массив данных строка 1.
 * @param {Array} arr Массив данных строка 2.
 * @return {number} Искомое значение.
 */
const editDistBU = (arrA, arrB) => {
  const n = arrA.length; // строки
  const m = arrB.length; // столбцы

  const arrD = [];
  for (let row = 0; row <= n; row++) {
    arrD.push([...Array(m + 1).fill(null)]);
  }

  // console.log('🚀 ~ file: edit-dist-bu-01.mjs ~ line 28 ~ editDistBU ~ arrD', arrD);

  for (let i = 0; i <= m; i++) {
    arrD[0][i] = i;
  }

  for (let j = 1; j <= n; j++) {
    arrD[j][0] = j;
  }

  // console.log('🚀 ~ file: edit-dist-bu-01.mjs ~ line 28 ~ editDistBU ~ arrD', arrD);

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      let c = diff(arrA[i - 1], arrB[j - 1]);
      arrD[i][j] = minTriad(arrD[i - 1][j] + 1, arrD[i][j - 1] + 1, arrD[i - 1][j - 1] + c);
    }
    // console.log('🚀 ~ file: edit-dist-bu-01.mjs ~ line 28 ~ editDistBU ~ arrD', arrD);
  }

  // console.log('🚀 ~ file: edit-dist-bu-01.mjs ~ line 28 ~ editDistBU ~ arrD', arrD);
  // console.log('🚀 ~ file: edit-dist-bu-01.mjs ~ line 28 ~ editDistBU ~ arrD', arrD[n][m]);

  return arrD[n][m];
};

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  // console.log('🚀 ~ file: edit-dist-bu-01.mjs ~ line 70 ~ process.stdin.on ~ arrOne', arrOne);
  // console.log('🚀 ~ file: edit-dist-bu-01.mjs ~ line 70 ~ process.stdin.on ~ arrTwo', arrTwo);

  // CALCULATION
  const res = editDistBU(arrOne, arrTwo);

  // OUTPUT
  process.stdout.write(String(res));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  let first = 0;
  let second = 3;
  let third = 5;
  console.log(`Результат: === ${first} ? ${assert(res, first) ? 'SUCCES' : 'FAILURE'}`);
  console.log(`Результат: === ${second} ? ${assert(res, second) ? 'SUCCES' : 'FAILURE'}`);
  console.log(`Результат: === ${third} ? ${assert(res, third) ? 'SUCCES' : 'FAILURE'}`);
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
  arrOne = strOne.split('');
  arrTwo = strTwo.split('');

  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});
