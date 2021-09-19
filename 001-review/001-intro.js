let inputNumbers = '';

process.stdin.on('data', (data) => {
  inputNumbers += data;
  main();
});

process.on('SIGINT', () => {
  process.exit();
});

const main = () => {
  const [one, two] = inputNumbers.split(' ');
  const sum = String(Number(one) + Number(two));

  process.stdout.write(sum);
  process.exit();
};
