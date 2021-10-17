/**
Heap
MIN-heap and MAX-heap implementation

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

/**
 * Рассчет разницы во времени, между началом и окончанием операции
 *
 * @param {bigint} begin
 * @param {bigint} end
 */
const timeDiff = (begin, end) => (end - begin) / 1000000n;

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
 * Скомпенсировать индексы массива
 * как будто массив начинается с 1, а не с 0
 *
 * @param {number} idx индекс массива
 */
const zeroIDXCompensation = (idx) => idx + 1;

/**
 * /////////////////////////////////////////////////////////////
 *
 * ███╗░░░███╗██╗███╗░░██╗  ██╗░░██╗███████╗░█████╗░██████╗░
 * ████╗░████║██║████╗░██║  ██║░░██║██╔════╝██╔══██╗██╔══██╗
 * ██╔████╔██║██║██╔██╗██║  ███████║█████╗░░███████║██████╔╝
 * ██║╚██╔╝██║██║██║╚████║  ██╔══██║██╔══╝░░██╔══██║██╔═══╝░
 * ██║░╚═╝░██║██║██║░╚███║  ██║░░██║███████╗██║░░██║██║░░░░░
 * ╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝  ╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═╝░░░░░
 *
 * /////////////////////////////////////////////////////////////
 */

/**
 * Просеивание вверх для MIN-кучи
 *
 * ```js
 * // Вариант использования с каррированием
 * const siftUpCurry = curry(siftUp, heap);
 * ```
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
 * Удалить минимальный элемент из кучи
 *
 * @param {Array} arr массив с кучей
 */
const deleteMin = (arr) => {
  swap(arr, root(arr).elem, last(arr).elem);
  arr.pop();
  siftDown(arr, root(arr).idx);
};

/**
 * Получить минимальный элемент из кучи
 *
 * @param {Array} arr массив с кучей
 */
const getMin = (arr) => arr[0];

/**
 * Извлечь (с удалением) минимальный элемент из кучи
 *
 * @param {Array} arr массив с кучей
 * @return {*} elem значение извлекаемого элемента
 */
const extractMin = (arr) => {
  const max = getMin(arr);
  deleteMin(arr);
  return max;
};

/**
 * /////////////////////////////////////////////////////////////
 *
 * ███╗░░░███╗░█████╗░██╗░░██╗  ██╗░░██╗███████╗░█████╗░██████╗░
 * ████╗░████║██╔══██╗╚██╗██╔╝  ██║░░██║██╔════╝██╔══██╗██╔══██╗
 * ██╔████╔██║███████║░╚███╔╝░  ███████║█████╗░░███████║██████╔╝
 * ██║╚██╔╝██║██╔══██║░██╔██╗░  ██╔══██║██╔══╝░░██╔══██║██╔═══╝░
 * ██║░╚═╝░██║██║░░██║██╔╝╚██╗  ██║░░██║███████╗██║░░██║██║░░░░░
 * ╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝  ╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═╝░░░░░
 *
 * /////////////////////////////////////////////////////////////
 */

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
 * Каррированный вариант функции insertMax
 *
 * ```js
 * const insertCurry = curry(insert, heap);
 * ```
 *
 */
const insertCurry = curry(insertMax, heap);

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

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};

// RUNTIME ------
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
