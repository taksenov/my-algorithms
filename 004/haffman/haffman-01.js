// Haffman

let inputString = '';

// INPUT
process.stdin.on('data', (data) => {
  inputString += data;
  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});

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

  let queue = new Map();

  // CALCULATIONS
  // STEP 1
  for (let idx = 0; idx < inputString.length; idx++) {
    if (inputString[idx] === '\n') {
      continue;
    }

    if (queue.has(inputString[idx])) {
      queue.set(inputString[idx], {
        frequency: (queue.get(inputString[idx])?.frequency ?? 0) + 1,
        char: inputString[idx],
      });
    } else {
      queue.set(inputString[idx], {
        frequency: 1,
        char: inputString[idx],
      });
    }
  }

  // STEP 2
  let frequencies = [];

  queue.forEach((v) => {
    const { frequency, char } = v;
    frequencies.push({ frequency, char });
  });
  frequencies.sort((a, b) => b.frequency - a.frequency);

  // STEP 3
  let queueWithChildrens = [...frequencies];

  while (queueWithChildrens.length > 1) {
    const i = queueWithChildrens.pop();
    const j = queueWithChildrens.pop();

    queueWithChildrens.push({
      frequency: i.frequency + j.frequency,
      char: [i.char, j.char],
    });
  }

  const tree = {
    length: queueWithChildrens[0].frequency,
    path: queueWithChildrens[0].char,
  };

  // TODO: Написать шаг с парсиногом дерева и кодированием символов в строке
  // Структура дерева всегда такая:
  // tree { length: 12, path: [ [ [Array], 'b' ], 'a' ] }
  // IDEA: Согласно https://neerc.ifmo.ru/wiki/index.php?title=%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%A5%D0%B0%D1%84%D1%84%D0%BC%D0%B0%D0%BD%D0%B0
  // NB: Для первой итерации (самой частой буквы в строке не привязываемся к индексу массива), код всегда = 0
  // Если на 0 индексе массива, то в путь добавляем 1
  // Если на 1 индексе массива, то в путь добавляем 0

  // OUTPUT
  // FIXME: После тестирования удалить
  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  console.log(
    '🚀 ~ file: haffman-01.js ~ line 45 ~ main ~ frequencies',
    frequencies,
  );
  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  console.log('🚀 ~ file: haffman-01.js ~ line 45 ~ main ~ tree', tree);
  console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
  console.log(
    '🚀 ~ file: haffman-01.js ~ line 45 ~ main ~ inputString.length - 1',
    inputString.length - 1,
  );

  // TODO: Использовать в итоговой версии
  // process.stdout.write(String(listM.length));
  // process.stdout.write('\n');
  // let listOutput = listM.reduce((acc, item) => `${acc} ${item}`, '').trim();
  // process.stdout.write(String(listOutput));

  // END TIME
  const end = process.hrtime.bigint();

  // DEBUG OUTPUT
  console.log('\n');
  console.log('Время:', timeDiff(begin, end), ' ms.');

  // EXIT
  process.exit();
};
