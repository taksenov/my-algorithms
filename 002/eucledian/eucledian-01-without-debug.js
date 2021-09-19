let inputNumbers = '';

process.stdin.on('data', (data) => {
  inputNumbers += data;
  main();
});

process.on('SIGINT', () => {
  process.exit();
});

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
  const [one, two] = inputNumbers.split(' ');
  const GCD = euclideanAlgorithm(Number(one), Number(two));

  process.stdout.write(String(GCD));

  process.exit();
};
