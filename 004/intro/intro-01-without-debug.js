// Greedy: points of the segmentsNum

let inputNumbers = '';
let segmentsNum = 0;
let segmentsArr = [];

// INPUT
process.stdin.on('data', (data) => {
  inputNumbers += data;
  let [one, two] = inputNumbers.split(' ');

  if (!two) {
    segmentsNum = Number(one);
    inputNumbers = '';
  } else {
    segmentsArr = [...segmentsArr, [Number(one), Number(two)]];
    inputNumbers = '';

    if (segmentsArr.length === segmentsNum) {
      main();
    }
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

  segmentsArr.forEach((segment) => {
    if (isPointInSegment(point, segment)) {
      countM++;
      if (countM === 1) {
        listM = [...listM, point];
      }
    } else {
      point = segment[1];
      listM = [...listM, point];
    }
  });

  // OUTPUT
  let listOutput = listM.reduce((acc, item) => `${acc} ${item}`, '').trim();

  process.stdout.write(String(listM.length));
  process.stdout.write('\n');
  process.stdout.write(String(listOutput));

  // EXIT
  process.exit();
};
