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
  const [codes] = countString.split(' ');
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
  // CALCULATION
  const decodedString = decodeString(
    codesObj,
    encString,
    minCodeLen,
    maxCodeLen,
  );

  // OUTPUT
  process.stdout.write(decodedString);

  // EXIT
  process.exit();
};
