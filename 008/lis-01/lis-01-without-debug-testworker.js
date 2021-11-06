// VARS
let inputStrings = '';

let list = [];

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

  return res;
};

/**
 * Main!
 */
const main = () => {
  let res = 0;

  // CALCULATION
  res = LISBottomUp(list, withoutDivRemainderCondition);

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
  const [, ...rest] = arr.filter(Boolean);
  const points = rest.pop();
  list = points.split(' ').map((i) => Number(i));

  main();
});
