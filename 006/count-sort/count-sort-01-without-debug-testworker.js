// VARS
let inputStrings = '';

let list = [];

const countSort = (arr) => {
  const n = arr.length;
  let M = 10;
  let arrB = Array(M + 1).fill(0);
  let arrAs = Array(n).fill(0);

  for (let idx = 0; idx < n; idx++) {
    arrB[arr[idx]] += 1;
  }
  for (let idx = 1; idx <= M; idx++) {
    arrB[idx] += arrB[idx - 1];
  }
  for (let idx = n - 1; idx >= 0; idx--) {
    arrAs[arrB[arr[idx]] - 1] = arr[idx];
    arrB[arr[idx]] -= 1;
  }

  return arrAs;
};

/**
 * Main!
 */
const main = () => {
  let res = [];

  // CALCULATION
  res = countSort(list);

  // OUTPUT
  process.stdout.write(res.join(' '));
};

// RUNTIME ------
// STDIN
process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    inputStrings += chunk;
  }
});

process.stdin.on('end', () => {
  const arr = inputStrings.split('\n');
  const [, ...rest] = arr.filter(Boolean);
  const points = rest.pop();
  list = points.split(' ').map((i) => Number(i));

  main();
});
