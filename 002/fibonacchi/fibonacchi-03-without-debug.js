// Fibonacchi period Pizzano

let inputNumbers = '';

process.stdin.on('data', (data) => {
  inputNumbers += data;
  main();
});

process.on('SIGINT', () => {
  process.exit();
});

const main = () => {
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

  process.exit();
};
