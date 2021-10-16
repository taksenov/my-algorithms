let inputString = '';
let countNum = 0;
let commandsArr = [];

// Куча
let heap = [];

// STDIN
process.stdin.on('data', (data) => {
  inputString += data;

  const arr = inputString.split('\n');
  const countString = arr[0];
  countNum = Number(countString);

  if (arr.length - 1 === countNum + 1) {
    commandsArr = [...arr.slice(1, countNum + 1).filter(Boolean)];

    main();
  }
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});

const curry = (fn, ...par) => {
  const curried = (...args) =>
    fn.length > args.length ? curry(fn.bind(null, ...args)) : fn(...args);
  return par.length ? curried(...par) : curried;
};

const idxByNode = (arr, elem) => arr.indexOf(elem);

const key = curry(idxByNode, heap);

/**
 * Корень
 *
 * @param {Array} arr массив с кучей
 * @return {Object} .idx индекс родителя
 *                  .elem элемент родителя
 */
const root = (arr) => ({ idx: 0, elem: arr[0] });

/**
 * Последний в массиве
 *
 * @param {Array} arr массив с кучей
 * @return {Object} .idx индекс родителя
 *                  .elem элемент родителя
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
  // const predIDX = Math.floor((idx - 1) / 2);
  return { idx: predIDX, elem: arr[predIDX] };
};

const swap = (arr, i, j) => {
  const idxI = key(i);
  const idxJ = key(j);
  const k = arr[idxI];
  arr[idxI] = arr[idxJ];
  arr[idxJ] = k;
};

/**
 * Просеивание вверх для MAX-кучи
 *
 * @param {Array} arr массив с кучей
 * @param {number} idx индекс исследуемого элемента
 */
const siftUpMax = (arr, idx) => {
  while (idx > 0 && pred(arr, idx).elem < arr[idx]) {
    swap(arr, arr[idx], pred(arr, idx).elem);
    idx = pred(arr, idx).idx;
  }
};

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
  while (2 * idx <= last(arr).idx) {
    const j = maxTriad(arr, idx);
    if (j === idx) {
      break;
    }
    swap(arr, arr[idx], arr[j]);
    idx = j;
  }
};

let tstHeap = [100000000, 334, 323123123];
console.log(
  '🚀 ~ file: heap-01-without-debug.js ~ line 132 ~ tstHeap',
  tstHeap,
);
siftDownMax(tstHeap, root(tstHeap).idx);
console.log(
  '🚀 ~ file: heap-01-without-debug.js ~ line 134 ~ tstHeap',
  tstHeap,
);

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

const insertCurry = curry(insertMax, heap);

const deleteMax = (arr) => {
  swap(arr, root(arr).elem, last(arr).elem);
  arr.pop();
  siftDownMax(arr, root(arr).idx);
};

const getMax = (arr) => arr[0];

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
        // console.log(
        //   '🚀 ~ file: heap-01-without-debug.js ~ line 164 ~ commandsArr.forEach ~ heap',
        //   heap,
        // );
        break;
      }
      default:
        break;
    }
  });

  // EXIT
  process.exit();
};
