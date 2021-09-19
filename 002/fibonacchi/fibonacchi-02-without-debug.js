let inputNumber = '';

process.stdin.on('data', (data) => {
  inputNumber += data;
  main();
});

process.on('SIGINT', () => {
  process.exit();
});

const main = () => {
  const N = Number(inputNumber);
  let lastNumbersOfTwoLastFibs = [0, 1];

  for (let idx = 2; idx <= N; idx++) {
    const lastNumber =
      (lastNumbersOfTwoLastFibs[0] + lastNumbersOfTwoLastFibs[1]) % 10;
    lastNumbersOfTwoLastFibs[0] = lastNumbersOfTwoLastFibs[1];
    lastNumbersOfTwoLastFibs[1] = lastNumber;
  }
  process.stdout.write(String(lastNumbersOfTwoLastFibs[1]));

  process.exit();
};
