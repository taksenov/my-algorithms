// Fibonacchi period Pizzano

console.log(
  `
  [
    { "n": "9", "m": 2, "expected": 0 },
    { "n": "10", "m": 2, "expected": 1 },
    { "n": "1025", "m": 55, "expected": 5 },
    { "n": "12589", "m": 369, "expected": 89 },
    { "n": "1598753", "m": 25897, "expected": 20305 },
    { "n": "60282445765134413", "m": 2263, "expected": 974 }
  ]
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  `,
);

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

const main = () => {
  const begin = process.hrtime.bigint();

  const [n, m] = inputNumbers.split(' ');
  const N = BigInt(n);
  const M = BigInt(m);

  let arr = [BigInt(0), BigInt(1)];

  for (let idx = BigInt(2); idx <= BigInt(6) * M; idx++) {
    const lastNumberWithModM =
      (arr[idx - BigInt(2)] + arr[idx - BigInt(1)]) % BigInt(M);
    arr.push(lastNumberWithModM);

    if (
      arr[arr.length - 2] === BigInt(0) &&
      arr[arr.length - 1] === BigInt(1)
    ) {
      break;
    }
  }

  const periodPizzano = BigInt(arr.length - 2);
  const index = Number(N % periodPizzano);

  process.stdout.write(String(arr[index]));

  const end = process.hrtime.bigint();

  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');
  console.log('Массив периода Пиззано:', arr);
  console.log('Индекс:', index);

  process.exit();
};
