// Fibonacchi

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
  let arrOfFibs = [0, 1];
  arrOfFibs.length = N + 1;

  for (let idx = 2; idx < arrOfFibs.length; idx++) {
    arrOfFibs[idx] = arrOfFibs[idx - 1] + arrOfFibs[idx - 2];
  }
  process.stdout.write(String(arrOfFibs[N]));

  process.exit();
};
