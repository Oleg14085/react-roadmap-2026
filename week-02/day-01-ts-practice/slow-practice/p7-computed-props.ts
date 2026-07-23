export {};
interface KeyValuePair {
  key: string;
  value: number;
}
// 2️⃣ Функция toObject
// Возвращает объект, где pair.key становится именем свойства, а pair.value — значением.
function toObject(pair: KeyValuePair): Record<string, number> {
  return {
    [pair.key]: pair.value,
  };
}
// 3️⃣ Функция fromPairs
// Превращает массив пар в один объект.
// Пример: [{key:"a", value:1}, {key:"b", value:2}] → { a: 1, b: 2 }
// Используй цикл for...of или .reduce().
function fromPairs(pairs: KeyValuePair[]): Record<string, number> {
  return pairs.reduce((acc, el) => {
    return {
      ...acc,
      [el.key]: el.value,
    };
  }, {});
}
// 4️⃣ Функция updateValue
// Возвращает НОВЫЙ объект, где значение под key заменено на newValue.
// Если ключа не было → добавь его.
// Не мутируй исходный obj.
function updateValue(
  obj: Record<string, number>,
  key: string,
  newValue: number,
): Record<string, number> {
  return {
    ...obj,
    [key]: newValue,
  };
}
// Тест 1: одна пара → объект
const obj1 = toObject({ key: "score", value: 100 });
console.log(obj1); // expected: { score: 100 }

// Тест 2: массив пар → один объект
const obj2 = fromPairs([
  { key: "x", value: 1 },
  { key: "y", value: 2 },
  { key: "z", value: 3 },
]);
console.log(obj2); // expected: { x: 1, y: 2, z: 3 }

// Тест 3: обновление значения
const base = { a: 10, b: 20 };
const updated = updateValue(base, "b", 99);
console.log(updated); // expected: { a: 10, b: 99 }
console.log(base); // expected: { a: 10, b: 20 } (исходный не изменился)
