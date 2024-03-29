# Курс: 10110101111010000010010110111101010011010101001110000000010010110010111001101000100000100000101101111100110000010100110001110000001110001011110011


```
19 146
и: 110
т: 111
 : 100
о: 0001
р: 0010
ы: 0011
е: 00000
а: 00001
к: 0110
А: 10110
л: 10111
г: 10100
м: 10101
:: 01010
я: 01011
п: 01000
.: 01001
М: 01110
д: 01111
```

Ссылка: 110010001110010001010100100011000110110100010101110100011010000100000111000100100000001100000110001110100101010110110001100001110001000110100001011111111111010110111110010110011110000001110010001010100100011000110110100010101110100011010000100000111000100100000001100000110001110100101010110110001100001110001000110100001011111111111010110111110010110001

```
26 354
s: 010
/: 011
t: 0010
p: 1010
e: 1011
o: 1000
r: 1001
u: 1110
l: 1111
h: 00111
:: 001100
i: 001101
k: 000010
.: 000011
g: 000000
c: 000001
2: 000110
1: 000111
7: 000100
y: 000101
a: 11010
b: 11011
[: 110010
]: 110011
(: 110000
): 110001
```

Основная книга: http://learningalgorithms.tilda.ws/

https://www.mccme.ru/free-books/shen/shen-induction.pdf
https://www.mccme.ru/free-books/shen/shen-log.pdf

Интересные книги:

- С. Дасгупта, Х. Пападимитриу, У. Вазирани. Алгоритмы. МЦНМО. 2014.
- А. Шень. Программирование: теоремы и задачи. МЦНМО. 2014.
- Т. Кормен, Ч. Лейзерсон, Р. Ривест, К. Штайн. Алгоритмы: построение и анализ. Вильямс. 2013.

Визуализация: https://www.cs.usfca.edu/~galles/visualization/

Материалы по C++

- https://man7.org/linux/man-pages/man1/gcc.1.html

## Какие ЯП можно использовать

```
27 253
t: 100
/: 101
s: 111
e: 0000
p: 0110
o: 1100
1: 1101
i: 00011
n: 00110
-: 00111
7: 00100
3: 00101
h: 000101
:: 0001000
k: 0001001
.: 011110
r: 011111
g: 011100
l: 011101
S: 010010
C: 010011
d: 010000
9: 010001
?: 010110
u: 010111
=: 010100
8: 010101
0001011001000110111000100010110111110000000110000110001001011110110001111101110010101110100001111111100001101010100101000000011000111010011110001000000000011101000111010010000101101111100000001101010010101011001011100110000111000101001101001001101010101
```

## Строка запуска для nodejd

```sh
node --max-old-space-size=256 {%filename%}
```

## Строка запуска для gcc

```sh
g++ -std=c++11 -Wall -Wextra -O2 {%filename%} -o {%filename.out%}
```

Вариант 2:

```sh
g++ -std=c99 -pipe -O2 -static {%filename%} -o main
```

## Вспомогательные функции

### JS

```js
/**
 * Рассчет разницы во времени, между началом и окончанием операции
 *
 * @param {bigint} begin
 * @param {bigint} end
 */
const timeDiff = (begin, end) => (end - begin) / 1000000n;
```

```js
console.log('Время:', timeDiff(begin, end), ' ms.');
```

```js
// Установка меток времени
const begin = process.hrtime.bigint();
const end = process.hrtime.bigint();
```

```js
// stdin
process.stdin.on('data', (data) => {
  inputNumber += data;
  main();
});

process.on('SIGINT', () => {
  process.exit();
});
```

```js
// stdout
process.stdout.write(String(arrOfFibs[N]));
process.exit();
```
