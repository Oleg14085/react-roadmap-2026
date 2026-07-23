type SuccessResponse = {
  status: "success";
  data: { id: string; title: string };
  timestamp: number;
};

type ErrorResponse = {
  status: "error";
  code: number;
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;
// 2️⃣ Функция-гард isSuccess
// Проверяет поле status.
// Возвращает true, если статус 'success', иначе false.
// Используй синтаксис response is SuccessResponse (это подсказка для TS, а не возвращаемое значение).
function isSuccess(response: ApiResponse): response is SuccessResponse {
  if (response.status === "success") {
    return true;
  } else {
    return false;
  }
}
// 3️⃣ Функция formatResponse
// Если isSuccess(response) === true → верни: "Успех: {title} (ID: {id}), время: {timestamp}"
// Если false → верни: "Ошибка {code}: {message}"
// Внутри функции используй isSuccess для ветвления. Не пиши if (response.status === 'success').
function formatResponse(response: ApiResponse): string {
  if (isSuccess(response) === true) {
    return `Успех: ${response.data.title} (ID: ${response.data.id}), время: ${response.timestamp}`;
  } else {
    return `Ошибка ${response.code}: ${response.message}`;
  }
}
// 4️⃣ Тесты (в конце файла)
// Создай минимум 2 объекта ApiResponse:
// Один с status: 'success', заполни data и timestamp.
// Один с status: 'error', заполни code и message.
// Выведи в консоль результат formatResponse для каждого.
const info1: ApiResponse = {
  status: "success",
  data: { id: "1", title: "book" },
  timestamp: 2,
};
const info2: ApiResponse = {
  status: "error",
  code: 234,
  message: "error",
};
console.log(formatResponse(info1));
console.log(formatResponse(info2));
