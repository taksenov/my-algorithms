// Eucledian

let inputNumbers = '';

process.stdin.on('data', (data) => {
  inputNumbers += data;
  main();
});

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
 * @param {number} a
 * @param {number} b
 * @return {number|null}
 */
const euclideanAlgorithm = (a, b) => {
  if (a === 0) {
    return b;
  }

  if (b === 0) {
    return a;
  }

  if (a >= b) {
    return euclideanAlgorithm(a % b, b);
  }

  if (b >= a) {
    return euclideanAlgorithm(a, b % a);
  }
};

/**
 * Main!
 */
const main = () => {
  const begin = process.hrtime.bigint();

  const [one, two] = inputNumbers.split(' ');
  const GCD = euclideanAlgorithm(Number(one), Number(two));

  process.stdout.write(String(GCD));

  const end = process.hrtime.bigint();

  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  process.exit();
};
