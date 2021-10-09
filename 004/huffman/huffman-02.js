/**
Huffman

NB: Пустая строка в конце обязательна. 
Особенности ввода мультистроковых данных через stdin

Input data example: 
```
6 20
c: 10
e: 11
a: 010
p: 011
t: 000
d: 001
01010101101100011001

```

Decode result:
`accepted`
*/

let inputString = '';
let codesNum = 0;
let codesObj = {};
let encString = '';
let minCodeLen = Infinity;
let maxCodeLen = 0;

// STDIN
process.stdin.on('data', (data) => {
  inputString += data;

  const arr = inputString.split('\n');
  const countString = arr[0];
  const [codes, len] = countString.split(' ');
  codesNum = Number(codes);

  if (arr.length - 1 === codesNum + 2) {
    for (let idx = 1; idx <= arr.length; idx++) {
      const element = arr[idx];
      if (!element) {
        continue;
      }

      const [char, code] = element.split(': ');
      if (!code) {
        encString = element;
      } else {
        if (code.length < minCodeLen) {
          minCodeLen = code.length;
        }
        if (code.length > maxCodeLen) {
          maxCodeLen = code.length;
        }

        codesObj[code] = char;
      }
    }

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

/**
 * Создает очередь с приоритетами
 *
 * @param {string} str входная строка для кодирования
 * @return {Map} result очередь
 */
const createQueue = (str) => {
  const result = new Map();

  for (let idx = 0; idx < str.length; idx++) {
    if (result.has(str[idx])) {
      result.set(str[idx], {
        frequency: result.get(str[idx]).frequency + 1,
        char: str[idx],
      });
    } else {
      result.set(str[idx], {
        frequency: 1,
        char: str[idx],
      });
    }
  }

  return result;
};

/**
 * Создает отсортированный по частотам массив символов
 *
 * @param {Map} queue очередь
 * @return {Array} result массив
 */
const createFrequencies = (queue) => {
  const result = [];

  queue.forEach((v) => {
    const { frequency, char } = v;
    result.push({ frequency, char });
  });
  result.sort((a, b) => b.frequency - a.frequency);

  return result;
};

/**
 * Создать бинарное дерево с кодами Хаффмана
 *
 * @param {*} frequencies
 * @return {*}
 */
const createBinaryTree = (frequencies) => {
  const queueWithChildrens = [...frequencies];

  while (queueWithChildrens.length > 1) {
    const i = queueWithChildrens.pop();
    const j = queueWithChildrens.pop();

    queueWithChildrens.push({
      frequency: i.frequency + j.frequency,
      char: [i.char, j.char],
    });

    // NB: Без сортировки по частотам дерево будет не эффективным
    queueWithChildrens.sort((a, b) => b.frequency - a.frequency);
  }

  const tree = {
    length: queueWithChildrens[0].frequency,
    path: queueWithChildrens[0].char,
  };

  const encoding = {};

  buildCodePath = (arr, code) => {
    if (Array.isArray(arr)) {
      buildCodePath(arr[0], code + '0');
      buildCodePath(arr[1], code + '1');
    } else {
      if (code === '') {
        encoding[arr] = '0';
        return;
      }

      let reverseCode = '';
      for (let idx = 0; idx < code.length; idx++) {
        const c = code[idx];
        reverseCode = c === '0' ? `${reverseCode}1` : `${reverseCode}0`;
      }

      encoding[arr] = reverseCode;
    }
  };

  buildCodePath(tree.path, '');

  const resCodeTable = frequencies.map((element) => {
    const { frequency, char } = element;

    return { frequency, char, code: encoding[char] };
  });

  return { resCodeTable, encoding };
};

/**
 * Создать закодированную строку
 *
 * @param {*} encoding
 * @param {*} str
 * @return {*}
 */
const createEncodedString = (encoding, str) => {
  let result = '';

  for (let idx = 0; idx < str.length; idx++) {
    const c = str[idx];
    if (c === '\n') {
      continue;
    }

    const ec = encoding[c];

    result = `${result}${ec}`;
  }

  return result;
};

/**
 * Раскодирование строки
 *
 * @param {object} cipher шифр
 * @param {string} str закодированная строка
 * @param {number} min минимальная длина кода в шифре
 * @param {number} max максимальная длина кода в шифре
 * @return {string} раскодированная строка
 */
const decodeString = (cipher, str, min, max) => {
  let result = '';
  let tmpStr = str;
  let tmpCheckedStrPart = '';

  while (tmpStr.length > 0) {
    let idx = min;
    while (idx <= max) {
      tmpCheckedStrPart = tmpStr.slice(0, idx);

      if (tmpCheckedStrPart in cipher) {
        result = `${result}${cipher[tmpCheckedStrPart]}`;
        tmpStr = tmpStr.slice(idx);
        idx = min;
      } else {
        idx += 1;
      }
    }
  }

  return result;
};

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  // CALCULATION
  const decodedString = decodeString(
    codesObj,
    encString,
    minCodeLen,
    maxCodeLen,
  );

  // OUTPUT
  process.stdout.write(decodedString);

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};
