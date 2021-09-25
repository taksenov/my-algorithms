// Greedy: various terms
// Тестировать на 999999999

/**
 * Рассчет разницы во времени, между началом и окончанием операции
 *
 * @param {bigint} begin
 * @param {bigint} end
 */
const timeDiff = (begin, end) => (end - begin) / 1000000n;

let stdin = process.openStdin();
stdin.on('data', function (data) {
  // BEGIN TIME
  const begin = process.hrtime.bigint();

  let number = parseInt(data);
  let aimArray = [];
  let i = 1;
  if (number >= 1 && number <= 10 ** 9) {
    while (number > 0) {
      if (number - i > i) {
        aimArray.push(i);
        number -= i;
        i++;
      } else {
        aimArray.push(number);
        number -= number;
      }
    }
  }
  console.log(`${aimArray.length}\n${aimArray.join(' ')}`);

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');
});
