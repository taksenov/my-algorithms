// VARS
let inputStrings = '';

let list = [];
let numbers = 0;
let maxWeight = 0;

/**
 * Возвращает массу для наиболее эффективно заполненного рюкзака
 *
 * @param {Array} arr Массив данных о весах.
 * @param {number} len Количество.
 * @param {number} capacity Вместимость.
 * @return {number} Масса в рюкзаке.
 */
const knapsack = (arr, len, capacity) => {
  let F = Array(capacity + 1).fill(0);
  F[0] = 1;
  let newF = [...F];

  for (let j = 0; j <= len; j++) {
    for (let i = arr[j]; i <= capacity; i++) {
      if (F[i - arr[j]] === 1) {
        newF[i] = 1;
      }
    }
    F = [...newF];
  }

  let res = capacity;
  while (F[res] === 0) {
    res -= 1;
  }
  return res;
};

/**
 * Main!
 */
const main = () => {
  let res = 0;

  // CALCULATION
  res = knapsack(list, numbers, maxWeight);

  // OUTPUT
  process.stdout.write(String(res));
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
  const [strOne, strTwo] = arr.filter(Boolean);
  const inputs = strOne.split(' ').map((i) => Number(i));
  [maxWeight, numbers] = inputs;
  list = strTwo.split(' ').map((i) => Number(i));

  main();
});
