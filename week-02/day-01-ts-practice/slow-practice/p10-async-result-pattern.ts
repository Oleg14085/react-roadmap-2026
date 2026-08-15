export {};
type Loading = { state: "loading" };
type Success<T> = { state: "success"; data: T };
type ErrorState = { state: "error"; message: string };
type AsyncResult<T> = Loading | Success<T> | ErrorState;

function isLoading<T>(result: AsyncResult<T>): result is Loading {
  if (!result) {
    return false;
  }
  return result.state === "loading";
}
function isSuccess<T>(result: AsyncResult<T>): result is Success<T> {
  if (!result) {
    return false;
  }
  return result.state === "success";
}
function isError<T>(result: AsyncResult<T>): result is ErrorState {
  if (!result) {
    return false;
  }
  return result.state === "error";
}
const handlers = {
  onLoading() {
    return "Загружаем...";
  },
  onSuccess(data: string) {
    return `Данные: ${data}`;
  },
  onError(message: string) {
    return `Ошибка: ${message}`;
  },
};
function matchResult<T, R>(
  result: AsyncResult<T>,
  handlers: {
    onLoading: () => R;
    onSuccess: (data: T) => R;
    onError: (message: string) => R;
  },
): R {
  if (isLoading(result)) {
    return handlers.onLoading();
  }
  if (isSuccess(result)) {
    return handlers.onSuccess(result.data);
  }
  if (isError(result)) {
    return handlers.onError(result.message);
  }
  throw new Error("Unknown state");
}

const loading: Loading = { state: "loading" };
const success: Success<string> = { state: "success", data: "Привет" };
const error: ErrorState = { state: "error", message: "Network error" };

console.log(matchResult(loading, handlers));
console.log(matchResult(success, handlers));
console.log(matchResult(error, handlers));
const numResult: AsyncResult<number> = { state: "success", data: 42 };
console.log(
  matchResult(numResult, {
    onLoading: () => -1,
    onSuccess: (n) => n * 2,
    onError: (message) => -999,
  }),
); // expected: 84
