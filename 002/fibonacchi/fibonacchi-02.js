// Fibonacchi last number

let inputNumber = '';

process.stdin.on('data', (data) => {
  inputNumber += data;
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

const main = () => {
  const begin = process.hrtime.bigint();
  const N = Number(inputNumber);
  let lastNumbersOfTwoLastFibs = [0, 1];

  for (let idx = 2; idx <= N; idx++) {
    const lastNumber =
      (lastNumbersOfTwoLastFibs[0] + lastNumbersOfTwoLastFibs[1]) % 10;
    lastNumbersOfTwoLastFibs[0] = lastNumbersOfTwoLastFibs[1];
    lastNumbersOfTwoLastFibs[1] = lastNumber;
  }
  process.stdout.write(String(lastNumbersOfTwoLastFibs[1]));

  const end = process.hrtime.bigint();

  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  process.exit();
};
