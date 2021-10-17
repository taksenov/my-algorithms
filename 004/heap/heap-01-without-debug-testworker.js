let inputString = '';
let countNum = 0;
let commandsArr = [];

// Куча
let heap = [];

// STDIN
process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    inputString += chunk;
  }
});

process.stdin.on('end', () => {
  const arr = inputString.split('\n');
  const countString = arr[0];
  countNum = Number(countString);

  commandsArr = [...arr.slice(1, countNum + 1).filter(Boolean)];

  main();
});

/**
 * Каррирование
 *
 * @param {*} fn
 * @param {*} par
 * @return {*}
 */
const curry = (fn, ...par) => {
  const curried = (...args) =>
    fn.length > args.length ? curry(fn.bind(null, ...args)) : fn(...args);
  return par.length ? curried(...par) : curried;
};

/**
 * Корень
 *
 * @param {Array} arr массив с кучей
 * @return {Object} .idx индекс корня
 *                  .elem элемент корня
 */
const root = (arr) => ({ idx: 0, elem: arr[0] });

/**
 * Последний в массиве
 *
 * @param {Array} arr массив с кучей
 * @return {Object} .idx индекс последнего листа
 *                  .elem элемент последнего листа
 */
const last = (arr) => ({ idx: arr.length - 1, elem: arr[arr.length - 1] });

/**
 * Родитель текущей вершины
 *
 * @param {Array} arr массив с кучей
 * @param {number} idx индекс исследуемого элемента
 * @return {Object} .idx индекс родителя
 *                  .elem элемент родителя
 */
const pred = (arr, idx) => {
  const predIDX = Math.trunc((idx - 1) / 2);
  return { idx: predIDX, elem: arr[predIDX] };
};

/**
 * Обменивает между собой элементы массива
 *
 * @param {Array} arr массив с кучей
 * @param {number} i индекс меняемго элемента (1)
 * @param {number} j индекс меняемго элемента (2)
 */
const swap = (arr, i, j) => {
  const k = arr[i];
  arr[i] = arr[j];
  arr[j] = k;
};

/**
 * Просеивание вверх для MAX-кучи
 *
 * @param {Array} arr массив с кучей
 * @param {number} idx индекс исследуемого элемента
 */
const siftUpMax = (arr, idx) => {
  while (idx > 0 && pred(arr, idx).elem < arr[idx]) {
    swap(arr, idx, pred(arr, idx).idx);
    idx = pred(arr, idx).idx;
  }
};

/**
 * Скомпенсировать индексы массива
 * как будто массив начинается с 1, а не с 0
 *
 * @param {number} idx индекс массива
 */
const zeroIDXCompensation = (idx) => idx + 1;

/**
 * Поиск максимума из трех
 *
 * @param {*} arr
 * @param {*} idx
 * @return {*}
 */
const maxTriad = (arr, idx) => {
  let j = idx;
  if (arr[2 * zeroIDXCompensation(idx) - 1] > arr[j]) {
    j = 2 * zeroIDXCompensation(idx) - 1;
  }
  if (
    2 * zeroIDXCompensation(idx) <= last(arr).idx &&
    arr[2 * zeroIDXCompensation(idx)] > arr[j]
  ) {
    j = 2 * zeroIDXCompensation(idx);
  }
  return j;
};

/**
 * Просеивание вниз для MAX-кучи
 *
 * @param {Array} arr массив с кучей
 * @param {number} idx индекс исследуемого элемента
 */
const siftDownMax = (arr, idx) => {
  let tmpIDX = idx;
  while (2 * tmpIDX <= last(arr).idx) {
    const j = maxTriad(arr, tmpIDX);
    if (j === tmpIDX) {
      break;
    }
    swap(arr, tmpIDX, j);
    tmpIDX = j;
  }
};

/**
 * Вставка узла в MAX-кучу
 *
 * @param {Array} arr массив с кучей
 * @param {*} elem значение вставляемого элемента
 */
const insertMax = (arr, elem) => {
  arr.push(elem);
  siftUpMax(arr, last(arr).idx);
};

/**
 * Каррированный вариант функции insertMax
 */
const insertCurry = curry(insertMax, heap);

/**
 * Удалить максимальный элемент из кучи
 *
 * @param {Array} arr массив с кучей
 */
const deleteMax = (arr) => {
  swap(arr, root(arr).idx, last(arr).idx);
  arr.pop();
  siftDownMax(arr, root(arr).idx);
};

/**
 * Получить максимальный элемент из кучи
 *
 * @param {Array} arr массив с кучей
 */
const getMax = (arr) => arr[0];

/**
 * Извлечь (с удалением) максимальный элемент из кучи
 *
 * @param {Array} arr массив с кучей
 * @return {*} elem значение извлекаемого элемента
 */
const extractMax = (arr) => {
  const max = getMax(arr);
  deleteMax(arr);
  return max;
};

/**
 * Main!
 */
const main = () => {
  // CALCULATION + OUTPUT
  commandsArr.forEach((str) => {
    switch (true) {
      case str.toUpperCase().includes('INSERT'): {
        const [, numStr] = str.split(' ');
        insertCurry(Number(numStr));
        break;
      }
      case str.toUpperCase().includes('EXTRACTMAX'): {
        process.stdout.write(String(extractMax(heap)));
        process.stdout.write('\n');
        break;
      }
      default:
        break;
    }
  });
};
