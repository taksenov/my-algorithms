process.stdin.on('data', (c) => {
  let [a, b] = String(c)
    .split(' ')
    .map((e) => +e);
  console.log(a + b);
});
