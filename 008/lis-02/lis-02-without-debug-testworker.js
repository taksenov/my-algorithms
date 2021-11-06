// VARS
let inputStrings = '';

let list = [];

/**
 * Условие: каждый элемент меньше предыдущего
 *
 * @param {number} prev Предыдущий элемент.
 * @param {number} current Текущий элемент.
 * @return {boolean} Соотвествует условию или нет.
 */
const decreaseCondition = (prev, current) => prev > current;

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

  return res.reverse();
};

/**
 * Main!
 */
const main = () => {
  let res = [];

  // CALCULATION
  const lisData = LISBottomUp(list, decreaseCondition);
  res = restoreIndexes(lisData);

  // OUTPUT
  process.stdout.write(String(lisData.ans));
  process.stdout.write('\n');
  process.stdout.write(res.join(' '));
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
