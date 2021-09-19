// Fibonacchi

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
  let arrOfFibs = [0, 1];
  arrOfFibs.length = N + 1;

  for (let idx = 2; idx < arrOfFibs.length; idx++) {
    arrOfFibs[idx] = arrOfFibs[idx - 1] + arrOfFibs[idx - 2];
  }
  process.stdout.write(String(arrOfFibs[N]));

  const end = process.hrtime.bigint();

  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');
  console.log('\n');
  console.log('Массив:', arrOfFibs);

  process.exit();
};
