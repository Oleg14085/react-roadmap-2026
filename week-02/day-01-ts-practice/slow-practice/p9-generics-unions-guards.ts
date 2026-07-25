export {};
// 1️⃣ Объяви универсальный тип Result<T>
// Успешный результат: содержит данные типа T
type Success<T> = {
  ok: true;
  data: T;
};

// Ошибка: содержит код и сообщение
type Failure = {
  ok: false;
  code: number;
  message: string;
};

// Объединённый тип с дженериком
type Result<T> = Success<T> | Failure;

// 2️⃣ Функция-гард isSuccess<T>
// Проверяет поле ok.
// Возвращает true, если ok === true.
// Используй синтаксис result is Success<T>.
function isSuccess<T>(result: Result<T>): result is Success<T> {
  if (result.ok) {
    return true;
  } else {
    return false;
  }
}
//3️⃣ Функция unwrapOr
// Если isSuccess(result) → верни result.data
// Если ошибка → верни defaultValue
// Внутри используй isSuccess, не прямой доступ к ok.
function unwrapOr<T>(result: Result<T>, defaultValue: T): T {
  if (isSuccess(result)) {
    return result.data;
  } else {
    return defaultValue;
  }
}
// 4️⃣ Функция mapResult
// Если успех → примени transform к data и верни новый Success<U>
// Если ошибка → верни ту же ошибку (без изменений)
// Используй isSuccess для проверки
function mapResult<T, U>(
  result: Result<T>,
  transform: (data: T) => U,
): Result<U> {
  if (isSuccess(result)) {
    return { ok: true, data: transform(result.data) };
  } else {
    return result;
  }
}

// Тест 1: Success с string
const userResult: Result<{ name: string; id: number }> = {
  ok: true,
  data: { name: "Alice", id: 42 },
};
console.log(unwrapOr(userResult, { name: "Guest", id: 0 }));
// expected: { name: "Alice", id: 42 }

// Тест 2: Failure
const errorResult: Result<{ name: string; id: number }> = {
  ok: false,
  code: 404,
  message: "Not found",
};
console.log(unwrapOr(errorResult, { name: "Guest", id: 0 }));
// expected: { name: "Guest", id: 0 }

// Тест 3: mapResult с успехом
const transformed = mapResult(userResult, (user) => user.name.toUpperCase());
console.log(transformed);
// expected: { ok: true, data: "ALICE" }

//Тест 4: mapResult с ошибкой (должна остаться ошибкой)
//const errorMapped = mapResult(errorResult, (user) => user.name.toUpperCase());
//console.log(errorMapped);
// expected: { ok: false, code: 404, message: "Not found" }
