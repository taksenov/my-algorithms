// Greedy: the problem about the backpack

let inputNumbers = '';
let goodsArr = [];
let quantity = 0;
let capacity = 0;
let count = 0;

// INPUT
process.stdin.on('data', (data) => {
  // NB: For test worker
  // inputNumbers += data;

  // const [count, ...rest] = inputNumbers.split('\n');
  // let [one, two] = count.split(' ');
  // quantity = Number(one);
  // capacity = Number(two);

  // for (let idx = 0; idx < quantity; idx++) {
  //   const element = rest[idx];
  //   const [one, two] = element.split(' ');
  //   goodsArr = [...goodsArr, [Number(one), Number(two)]];
  // }

  // if (goodsArr.length === quantity) {
  //   main();
  // }

  // NB: For manual testing
  inputNumbers += data;

  let [one, two] = inputNumbers.split(' ');
  count++;

  if (count === 1) {
    quantity = Number(one);
    capacity = Number(two);
    inputNumbers = '';
  } else {
    goodsArr = [...goodsArr, [Number(one), Number(two)]];
    inputNumbers = '';

    if (goodsArr.length === quantity) {
      main();
    }
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
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let maximumСost = 0;

  // CALCULATIONS
  goodsArr = goodsArr.sort(([c1, w1], [c2, w2]) => c2 / w2 - c1 / w1);
  goodsArr.forEach((element) => {
    const [c, w] = element;
    const tmpCap = capacity;
    const costPerUnit = c / w;

    if (capacity === 0) {
      return;
    }

    if (w <= tmpCap) {
      maximumСost += c;
      capacity -= w;
    } else {
      maximumСost += costPerUnit * tmpCap;
      capacity -= tmpCap;
    }
  });

  // OUTPUT
  process.stdout.write(String(Math.ceil(maximumСost * 10000) / 10000));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};
