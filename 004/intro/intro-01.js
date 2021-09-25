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
 * Рассчет разницы во времени, между началом и окончанием операции
 *
 * @param {bigint} begin
 * @param {bigint} end
 */
const timeDiff = (begin, end) => (end - begin) / 1000000n;

/**
 * Main!
 */
const main = () => {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

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
  process.stdout.write(String(listM.length));
  process.stdout.write('\n');
  let listOutput = listM.reduce((acc, item) => `${acc} ${item}`, '').trim();
  process.stdout.write(String(listOutput));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};
