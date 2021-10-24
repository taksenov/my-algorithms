// VARS
let inputStrings = '';
let list = [];

const mergeAndCount = (arr, l, m, r) => {
  let left = [];
  for (let i = l; i < m + 1; i++) {
    left.push(Number(arr[i]));
  }

  let right = [];
  for (let i = m + 1; i < r + 1; i++) {
    right.push(Number(arr[i]));
  }

  let currentA = 0;
  let currentB = 0;
  let k = l;
  let swaps = 0;

  while (currentA < left.length && currentB < right.length) {
    if (left[currentA] <= right[currentB]) {
      arr[k++] = left[currentA++];
    } else {
      arr[k++] = right[currentB++];
      swaps += m + 1 - (l + currentA);
    }
  }
  while (currentA < left.length) {
    arr[k++] = left[currentA++];
  }
  while (currentB < right.length) {
    arr[k++] = right[currentB++];
  }
  return swaps;
};

const mergeSortAndCount = (arr, l, r) => {
  let arrTmp = arr;
  let count = 0;
  if (l < r) {
    let m = Math.floor((l + r) / 2);

    count += mergeSortAndCount(arrTmp, l, m).count;
    count += mergeSortAndCount(arrTmp, m + 1, r).count;
    count += mergeAndCount(arrTmp, l, m, r);
  }
  return { count, sortedList: arrTmp };
};

/**
 * Main!
 */
const main = () => {
  // CALCULATION
  const { count: res } = mergeSortAndCount(list, 0, list.length - 1);

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
  const [, secondStr] = arr;
  [...list] = secondStr.split(' ');

  main();
});
