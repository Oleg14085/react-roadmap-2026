export {};

// Успех: status: 'success' + данные пользователя
type AuthSuccess = {
  status: "success"; // ← дискриминатор
  user: { id: number; name: string; email: string };
  token: string;
};

// Ошибка: status: 'error' + детали ошибки
type AuthError = {
  status: "error"; // ← дискриминатор
  message: string;
  retryAfter?: number; // опционально: через сколько секунд повторить
};

// Объединённый тип
type AuthResponse = AuthSuccess | AuthError;

// 2. Type Guard
function isAuthSuccess(response: AuthResponse): response is AuthSuccess {
  return response.status === "success";
}
// 3. Обработчик
function handleAuth(response: AuthResponse): string {
  if (isAuthSuccess(response)) {
    const res = `Добро пожаловать, ${response.user.name}! Токен: ${response.token}`;
    return res; // ??? верни строку с именем и токеном
  } else {
    const err = `Ошибка: ${response.message}. Повторите через ${response.retryAfter}с`;
    return response.retryAfter ? err : `Ошибка: ${response.message}`;
  }
}

// Тест 1: Успех
const ok: AuthResponse = {
  status: "success",
  user: { id: 1, name: "Alice", email: "a@a.com" },
  token: "abc-123",
};

// Тест 2: Ошибка без retryAfter
const err1: AuthResponse = {
  status: "error",
  message: "Invalid password",
};

// Тест 3: Ошибка с retryAfter
const err2: AuthResponse = {
  status: "error",
  message: "Too many requests",
  retryAfter: 60,
};

console.log(handleAuth(ok)); // expected: "Добро пожаловать, Alice! Токен: abc-123"
console.log(handleAuth(err1)); // expected: "Ошибка: Invalid password"
console.log(handleAuth(err2)); // expected: "Ошибка: Too many requests. Повторите через 60с"
