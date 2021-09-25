// Это решение работает внутри среды тестирования,
// потому что данные отдаются в виде:
// ```
// 3
// 1 3
// 2 5
// 3 6
//
// ```
// а не построчно!
// ВНИМАНИЕ: В тестах есть пустая строка в конце входных данных!

let inputNumbers = '';
let segmentsNum = 0;
let segmentsArr = [];

// INPUT
process.stdin.on('data', (data) => {
  inputNumbers += data;

  const [count, ...rest] = inputNumbers.split('\n');
  segmentsNum = Number(count);

  for (let idx = 0; idx < count; idx++) {
    const element = rest[idx];
    const [one, two] = element.split(' ');
    segmentsArr = [...segmentsArr, [Number(one), Number(two)]];
  }

  if (segmentsArr.length === segmentsNum) {
    main();
  }
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});

const isPointInSegment = (point, segment) =>
  segment[0] <= point && point <= segment[1];

/**
 * Main!
 */
const main = () => {
  let listM = [];
  let countM = 0;

  // CALCULATIONS
  segmentsArr = segmentsArr.sort((a, b) => a[1] - b[1]);

  let point = segmentsArr[0][1];

  for (let idx = 0; idx < segmentsArr.length; idx++) {
    const segment = segmentsArr[idx];
    if (isPointInSegment(point, segment)) {
      countM++;
      if (countM === 1) {
        listM = [...listM, point];
      }
    } else {
      point = segment[1];
      listM = [...listM, point];
    }
  }

  // OUTPUT
  let listOutput = '';
  for (let idx = 0; idx < listM.length; idx++) {
    const element = listM[idx];
    listOutput = `${listOutput} ${element}`.trim();
  }

  process.stdout.write(String(listM.length));
  process.stdout.write('\n');
  process.stdout.write(String(listOutput));

  // EXIT
  process.exit();
};
