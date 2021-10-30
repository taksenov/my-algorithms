/**
 * Greedy: knapsack problem
 *
 * ```
 * node --max-old-space-size=256 ./004/intro/intro-02.mjs < ./004/intro/test-data-02.txt
 * ```
 */
import { timeDiff } from '../../js-utils/debug/debug.mjs';
import { assert } from '../../js-utils/assert/assert.mjs';

let inputStrings = '';
let goodsArr = [];
let capacity = 0;

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let maximumСost = 0;

  // CALCULATIONS
  // Первоначальный вариант
  // goodsArr = goodsArr.sort(([c1, w1], [c2, w2]) => c2 / w2 - c1 / w1);

  // Оптимизированный вариант
  // NB: Скорость работы можно увеличить воспользовавшись Свойством пропорции
  // Произведение крайних членов пропорции равно произведению средних членов этой пропорции.
  // a / b = c / d = a * d = b * c
  goodsArr = goodsArr.sort(([c1, w1], [c2, w2]) => c2 * w1 - w2 * c1);
  goodsArr.forEach((element) => {
    if (capacity === 0) {
      return;
    }

    const [c, w] = element;
    const tmpCap = capacity;
    const costPerUnit = c / w;

    if (w <= tmpCap) {
      maximumСost += c;
      capacity -= w;
    } else {
      maximumСost += costPerUnit * tmpCap;
      capacity -= tmpCap;
    }
  });

  // OUTPUT
  const res = String(Math.ceil(maximumСost * 10000) / 10000);
  process.stdout.write(res);

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log(`Результат: ${assert(res, '180') ? 'SUCCES' : 'FAILURE'}`);
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};

// RUNTIME ------
// STDIN
process.stdin.on('data', (data) => {
  inputStrings += data;

  const arr = inputStrings.split('\n');
  const [firstEl, ...rest] = arr.filter(Boolean);
  const [, two] = firstEl.split(' ');
  capacity = Number(two);
  rest.forEach((el) => {
    const [s, e] = el.split(' ');
    const start = Number(s);
    const end = Number(e);
    goodsArr.push([start, end]);
  });

  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});
