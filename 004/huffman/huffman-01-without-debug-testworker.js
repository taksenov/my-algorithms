let inputString = '';

// INPUT
process.stdin.on('data', (data) => {
  inputString += data.toString().split('\n')[0];
  main();
});

// ESCAPE
process.on('SIGINT', () => {
  process.exit();
});

/**
 * Main!
 */
const main = () => {
  let queue = new Map();

  // CALCULATIONS
  // STEP 1
  for (let idx = 0; idx < inputString.length; idx++) {
    if (queue.has(inputString[idx])) {
      queue.set(inputString[idx], {
        frequency: queue.get(inputString[idx]).frequency + 1,
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

    // Сортируем по частотам
    queueWithChildrens.sort((a, b) => b.frequency - a.frequency);
  }

  const tree = {
    length: queueWithChildrens[0].frequency,
    path: queueWithChildrens[0].char,
  };

  // STEP 4
  let encoding = {};

  buildCodePath = (arr, code) => {
    if (Array.isArray(arr)) {
      buildCodePath(arr[0], code + '0');
      buildCodePath(arr[1], code + '1');
    } else {
      if (code === '') {
        encoding[arr] = '0';
        return;
      }

      let reverseCode = '';
      for (let idx = 0; idx < code.length; idx++) {
        const c = code[idx];
        reverseCode = c === '0' ? `${reverseCode}1` : `${reverseCode}0`;
      }

      encoding[arr] = reverseCode;
    }
  };

  buildCodePath(tree.path, '');

  const resCodeTable = frequencies.map((element) => {
    const { frequency, char } = element;

    return { frequency, char, code: encoding[char] };
  });

  // ENCODING
  let encodedString = '';
  for (let idx = 0; idx < inputString.length; idx++) {
    const c = inputString[idx];
    if (c === '\n') {
      continue;
    }

    const ec = encoding[c];

    encodedString = `${encodedString}${ec}`;
  }

  // OUTPUT
  process.stdout.write(`${frequencies.length} ${encodedString.length}`);
  process.stdout.write('\n');
  for (let idx = 0; idx < resCodeTable.length; idx++) {
    const element = resCodeTable[idx];
    process.stdout.write(`${element.char}: ${element.code}`);
    process.stdout.write('\n');
  }
  process.stdout.write(encodedString);

  // EXIT
  process.exit();
};
