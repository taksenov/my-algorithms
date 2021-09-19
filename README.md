# Курс: Алгоритмы: теория и практика. Методы

Ссылка: [https://------.org/course/---/syllabus](https://------.org/course/---/syllabus)

Основная книга: http://learningalgorithms.tilda.ws/

https://www.mccme.ru/free-books/shen/shen-induction.pdf
https://www.mccme.ru/free-books/shen/shen-log.pdf

Интересные книги:

- С. Дасгупта, Х. Пападимитриу, У. Вазирани. Алгоритмы. МЦНМО. 2014.
- А. Шень. Программирование: теоремы и задачи. МЦНМО. 2014.
- Т. Кормен, Ч. Лейзерсон, Р. Ривест, К. Штайн. Алгоритмы: построение и анализ. Вильямс. 2013.

Визуализация: https://www.cs.usfca.edu/~galles/visualization/

## Какие ЯП можно использовать

https://------.org/lesson/-------/step/-?unit=----

## Строка запуска для nodejd

```sh
node --max-old-space-size=256 {%filename%}
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
