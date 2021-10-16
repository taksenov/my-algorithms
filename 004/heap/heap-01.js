/**
Heap

NB: Пустая строка в конце обязательна.
Особенности ввода мультистроковых данных через stdin

Input data example:
```
6
Insert 200
Insert 10
ExtractMax
Insert 5
Insert 500
ExtractMax

```

Result:
```
200
500
```

```
9
Insert 53
Insert 7
Insert 22
Insert 6
Insert 5
Insert 21
Insert 20
ExtractMax
ExtractMax

```
*/

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

/**
 * Рассчет разницы во времени, между началом и окончанием операции
 *
 * @param {bigint} begin
 * @param {bigint} end
 */
const timeDiff = (begin, end) => (end - begin) / 1000000n;

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
  const predIDX = Math.floor((idx - 1) / 2);
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
 * Просеивание вверх для MIN-кучи
 *
 * @param {Array} arr массив с кучей
 * @param {number} idx индекс исследуемого элемента
 */
const siftUp = (arr, idx) => {
  while (idx > 0 && pred(arr, idx).elem > arr[idx]) {
    swap(arr, arr[idx], pred(arr, idx).elem);
    idx = pred(arr, idx).idx;
  }
};
// const siftUpCurry = curry(siftUp, heap);

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
 * Поиск минимума из трех
 *
 * @param {*} arr
 * @param {*} idx
 * @return {*}
 */
const minTriad = (arr, idx) => {
  let j = idx;
  if (arr[2 * zeroIDXCompensation(idx)] < arr[j]) {
    j = 2 * zeroIDXCompensation(idx);
  }
  if (
    2 * zeroIDXCompensation(idx) + 1 <= last(arr).idx &&
    arr[2 * zeroIDXCompensation(idx) + 1] < arr[j]
  ) {
    j = 2 * zeroIDXCompensation(idx) + 1;
  }
  return j;
};

/**
 * Просеивание вниз для MIN-кучи
 *
 * @param {Array} arr массив с кучей
 * @param {number} idx индекс исследуемого элемента
 */
const siftDown = (arr, idx) => {
  while (2 * idx <= last(arr).idx) {
    const j = minTriad(arr, idx);
    if (j === idx) {
      break;
    }
    swap(arr, arr[idx], arr[j]);
    idx = j;
  }
};

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

/**
 * Вставка узла в MIN-кучу
 *
 * @param {Array} arr массив с кучей
 * @param {*} elem значение вставляемого элемента
 */
const insert = (arr, elem) => {
  arr.push(elem);
  siftUp(arr, last(arr).idx);
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

// const insertCurry = curry(insert, heap);
const insertCurry = curry(insertMax, heap);

const deleteMin = (arr) => {
  swap(arr, root(arr).elem, last(arr).elem);
  arr.pop();
  siftDown(arr, root(arr).idx);
};

const deleteMax = (arr) => {
  swap(arr, root(arr).elem, last(arr).elem);
  arr.pop();
  siftDownMax(arr, root(arr).idx);
};

const getMin = (arr) => arr[0];

const extractMin = (arr) => {
  const max = getMin(arr);
  deleteMin(arr);
  return max;
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
  // BEGIN TIME
  const begin = process.hrtime.bigint();

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

  // OUTPUT

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};
