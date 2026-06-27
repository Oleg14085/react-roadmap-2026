// Успешный ответ: ok: true + данные + метаданные
type Success<T> = {
  ok: true;
  data: T;
  meta: { page: number; total: number };
};

// Ошибка: ok: false + сообщение + код
type Failure = {
  ok: false;
  error: string;
  code: number;
};

// Объединённый тип
type Result<T> = Success<T> | Failure;
// 1. Типы (уже описаны выше, просто скопируй)

// 2. Type Guard
function isSuccess<T>(result: Result<T>): result is Success<T> {
  return result.ok// ???
}

// 3. Обработчик
function handleResult(result: Result<{ name: string; id: number }>): string {
  if (isSuccess(result)) {
    // ✅ TS знает: result — Success<{ name: string; id: number }>
    // Доступны: result.data.name, result.data.id, result.meta.page
    return `User: ${result.data.name} (ID: ${result.data.id}), страница ${result.meta.page}`;
  } else {
    // ✅ TS знает: result — Failure
    // Доступны: result.error, result.code
    return `Error ${result.code}: ${result.error}`;
  }
}

// === ПРОВЕРКА ===
const success: Result<{ name: string; id: number }> = {
  ok: true,
  data: { name: "Alice", id: 42 },
  meta: { page: 1, total: 100 }
};

const failure: Result<{ name: string; id: number }> = {
  ok: false,
  error: "Not found",
  code: 404
};

console.log(handleResult(success));  
// expected: "User: Alice (ID: 42), страница 1"

console.log(handleResult(failure));  
// expected: "Error 404: Not found"