/**
 * Quick Sort
 *
 * ```
 * node --max-old-space-size=256 ./006/quick-sort/quick-sort-01.mjs < ./006/quick-sort/test-data.txt
 * ```
 */
import { timeDiff } from '../../js-utils/debug/debug.mjs';
import { assert } from '../../js-utils/assert/assert.mjs';

// VARS
let inputStrings = '';

let listStarts = [];
let listEnds = [];
let listPoints = [];

/**
 * Получение случайного целого числа в заданном интервале
 *
 * @param {*} min
 * @param {*} max
 * @return {*} значение >= min и < max.
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Обменивает между собой элементы массива
 *
 * @param {Array} arr массив
 * @param {number} i индекс меняемого элемента (1)
 * @param {number} j индекс меняемого элемента (2)
 */
const swap = (arr, i, j) => {
  const k = arr[i];
  arr[i] = arr[j];
  arr[j] = k;
};

/**
 * Быстрая сортировка с разделением на три части
 *
 * @param {*} arr массив
 * @param {*} l индекс начала
 * @param {*} r индекс конца
 */
const quickSort = (arr, l, r) => {
  while (l < r) {
    // Randomizing pivot
    let randIDX = getRandomInt(l, r);
    swap(arr, randIDX, r);

    // partition
    const v = arr[r];
    if (r <= l) {
      return;
    }
    let i = l;
    let j = r - 1;
    let p = l - 1;
    let q = r;
    while (i <= j) {
      while (arr[i] < v) {
        i++;
      }
      while (arr[j] > v) {
        j--;
      }
      if (i >= j) {
        break;
      }
      swap(arr, i, j);
      if (arr[i] === v) {
        p++;
        swap(arr, p, i);
      }
      i++;
      if (arr[j] === v) {
        q--;
        swap(arr, q, j);
      }
      j--;
    }
    swap(arr, i, r);
    j = i - 1;
    i++;
    for (let k = l; k <= p; k++, j--) {
      swap(arr, k, j);
    }
    for (let k = r - 1; k >= q; k--, i++) {
      swap(arr, k, i);
    }

    // Recursion
    quickSort(arr, l, j);
    // Elimination of tail recursion
    l = i;
  }
};

/**
 * Бинарный поиск левой границы элемента
 *
 * @param {Arrray} arr отсортированный по возрастанию массив
 * @param {number} key искомое значение
 * @return {number} индекс границы
 */
const leftBoundary = (arr, key) => {
  let left = -1;
  let right = arr.length;
  while (right - left > 1) {
    let middle = Math.ceil((left + right) / 2);
    if (arr[middle] < key) {
      left = middle;
    } else {
      right = middle;
    }
  }
  return left;
};

/**
 * Бинарный поиск правой границы элемента
 *
 * @param {Arrray} arr отсортированный по возрастанию массив
 * @param {number} key искомое значение
 * @return {number} индекс границы
 */
const rightBoundary = (arr, key) => {
  let left = -1;
  let right = arr.length;
  while (right - left > 1) {
    let middle = Math.ceil((left + right) / 2);
    if (arr[middle] <= key) {
      left = middle;
    } else {
      right = middle;
    }
  }
  return right;
};

/**
 * Бинарный поиск с подсчетом количества элеметов границ отрезков
 *
 * @param {Array} arr отсортированный по возрастанию массив
 * @param {number} key искомое значение
 * @param {boolean} [isEnds=false] условие, что считаем начала или концы отрезков
 *                                 Если начала, что условие должно учитывать
 *                                 "количество элементов меньше и равных искомому"
 *                                 Иначе для концов, условие должно учитывать
 *                                 "количество элементов строго меньше искомого"
 * @return {Object} count количество элементов
 */
const binarySearchForSegments = (arr, key, isEnds = false) => {
  const left = leftBoundary(arr, key, isEnds);
  const right = rightBoundary(arr, key, isEnds);

  let res = 0;

  // Элемент за границами массива, слева
  if (right <= 0) {
    return 0;
  }

  // Элемент за границами массива, справа
  if (left === arr.length - 1) {
    return right;
  }

  // NB: Начала отрезков
  if (!isEnds) {
    if (Math.abs(right) - Math.abs(left) > 1) {
      res = right;
      return res;
    }
    return right;
  }

  // NB: Концы отрезков
  if (isEnds) {
    if (left < 0) {
      return 0;
    }
    if (Math.abs(right) - Math.abs(left) > 1) {
      res = left + 1;
      return res;
    }
    return right;
  }

  return res;
};

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let res = [];

  // CALCULATION
  quickSort(listStarts, 0, listStarts.length - 1);
  quickSort(listEnds, 0, listEnds.length - 1);

  listPoints.forEach((el) => {
    const S = binarySearchForSegments(listStarts, el, false);
    const E = binarySearchForSegments(listEnds, el, true);
    const segmentsOfPoint = S - E;
    res.push(segmentsOfPoint);
  });

  // OUTPUT
  process.stdout.write(res.join(' '));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log(`Результат: ${assert(res.join(' '), '2') ? 'SUCCES' : 'FAILURE'}`);
  console.log(`Результат: ${assert(res.join(' '), '1 0 0') ? 'SUCCES' : 'FAILURE'}`);
  console.log(`Результат: ${assert(res.join(' '), '0 4 5 7 6') ? 'SUCCES' : 'FAILURE'}`);
  console.log(`Результат: ${assert(res.join(' '), '0 3 6 4 5 0') ? 'SUCCES' : 'FAILURE'}`);
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
  listPoints = points.split(' ').map((i) => Number(i));
  rest.forEach((el) => {
    const [s, e] = el.split(' ');
    const start = Number(s);
    const end = Number(e);
    listStarts.push(start);
    listEnds.push(end);
  });

  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});
