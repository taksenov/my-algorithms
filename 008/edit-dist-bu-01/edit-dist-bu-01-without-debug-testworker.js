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

  for (let i = 0; i <= m; i++) {
    arrD[0][i] = i;
  }

  for (let j = 1; j <= n; j++) {
    arrD[j][0] = j;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      let c = diff(arrA[i - 1], arrB[j - 1]);
      arrD[i][j] = minTriad(arrD[i - 1][j] + 1, arrD[i][j - 1] + 1, arrD[i - 1][j - 1] + c);
    }
  }

  return arrD[n][m];
};

/**
 * Main!
 */
const main = () => {
  // CALCULATION
  const res = editDistBU(arrOne, arrTwo);

  // OUTPUT
  process.stdout.write(String(res));
};

// RUNTIME ------
// STDIN
process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    inputStrings += chunk;
  }
});

process.stdin.on('end', () => {
  const arr = inputStrings.split('\n');
  const [strOne, strTwo] = arr.filter(Boolean);
  arrOne = strOne.split('');
  arrTwo = strTwo.split('');

  main();
});
