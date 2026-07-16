export {};
//1
type UserRole = "admin" | "editor" | "viewer"; // Объяви тип UserRole, который разрешает только три значения: 'admin', 'editor', 'viewer'.
type UserStatus = "active" | "inactive" | "banned"; // Объяви тип UserStatus, который разрешает только: 'active', 'inactive', 'banned'.
interface User {
  id: number;
  name: string;
  role: UserRole;
  status: UserStatus;
} // Объяви интерфейс User с полями: id: number, name: string, role: UserRole, status: UserStatus.
//2 Напиши функцию getAccessLevel(role: UserRole): string, которая возвращает:
// 'admin' → 'full'
// 'editor' → 'partial'
// 'viewer' → 'read-only'
function getAccessLevel(role: UserRole): string {
  if (role === "admin") {
    return "full";
  }
  if (role === "editor") {
    return "partial";
  } else {
    return "read-only";
  }
}
//5 Напиши функцию formatUser(user: User): string, которая возвращает строку вида: "{name} ({role}) - {status}"
function formatUser(user: User): string {
  return `${user.name} (${user.role}) - ${user.status}`;
}
//6 Напиши функцию canEdit(user: User): boolean, которая возвращает true только если role — 'admin' или 'editor', И при этом status — 'active'. Во всех остальных случаях — false.
function canEdit(user: User): boolean {
  if (
    user.status === "active" &&
    (user.role === "admin" || user.role === "editor")
  ) {
    return true;
  }
  return false;
}
//7 В конце файла создай минимум 2 объекта типа User и выведи в консоль результаты работы всех трёх функций для каждого пользователя.
const user1: User = {
  id: 1,
  name: "Vasya",
  role: "admin",
  status: "active",
};
const user2: User = {
  id: 2,
  name: "Olga",
  role: "viewer",
  status: "banned",
};
console.log(getAccessLevel("admin"));
console.log(formatUser(user1));
console.log(canEdit(user1));
console.log(getAccessLevel("editor"));
console.log(formatUser(user2));
console.log(canEdit(user2));
console.log(getAccessLevel("viewer"));
