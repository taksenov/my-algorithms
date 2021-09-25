// Greedy: various terms

let inputNumber = '';

// INPUT
process.stdin.on('data', (data) => {
  inputNumber += data;
  main();
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

  const N = Number(inputNumber);

  let n = N;
  let terms = '';
  let count = 0;

  // CALCULATIONS
  if (n === 1 || n === 2) {
    count = 1;
    terms = `${n}`;
  } else {
    for (let idx = 1; idx < N; idx++) {
      const nPrev = n;
      n -= idx;

      if (n > idx) {
        idx === 1
          ? (terms = `${terms} ${idx}`.trim())
          : (terms = `${terms} ${idx}`);
        count++;
      } else {
        terms = `${terms} ${nPrev}`;
        count++;
        break;
      }
    }
  }

  // OUTPUT
  process.stdout.write(String(count));
  process.stdout.write('\n');
  process.stdout.write(terms);

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};
