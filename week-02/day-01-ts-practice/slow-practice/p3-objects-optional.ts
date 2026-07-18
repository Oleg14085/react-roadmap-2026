// 1 Страны, которые поддерживает система
type Country = "ru" | "us" | "de" | "fr";

// 2 Валюты
type Currency = "RUB" | "USD" | "EUR";
// 3 Объяви интерфейс UserProfile
interface UserProfile {
  id: string; // обязательное
  email: string; // обязательное
  firstName?: string; // опциональное
  lastName?: string; // опциональное
  country?: Country; // опциональное
  currency?: Currency; // опциональное
  phone?: string; // опциональное
  isVerified: boolean; // обязательное
}
// 4 Функция getDisplayName(user: UserProfile): string
// Возвращает имя для отображения:
// Если есть firstName И lastName → "{firstName} {lastName}"
// Если есть только firstName → "{firstName}"
// Если есть только lastName → "{lastName}"
// Если нет ни одного → возвращаем email
function getDisplayName(user: UserProfile): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) {
    return `${user.firstName}`;
  }
  if (user.lastName) {
    return `${user.lastName}`;
  } else {
    return `${user.email}`;
  }
}
// 5
//  Функция getProfileCompleteness(user: UserProfile): number
// Считает процент заполненности профиля:
// Обязательные поля (id, email, isVerified) не учитываются в расчёте (они всегда есть)
// Опциональные поля: firstName, lastName, country, currency, phone — всего 5 штук
// Возвращает число от 0 до 100: (заполненные / 5) * 100
// Пример: заполнены firstName и country → 2/5 * 100 = 40
function getProfileCompleteness(user: UserProfile): number {
  const optionalFields: Array<keyof UserProfile> = [
    "firstName",
    "lastName",
    "country",
    "currency",
    "phone",
  ];
  const fieldCount = optionalFields.filter((field) => {
    const value = user[field];
    return value !== undefined && value !== "";
  }).length;
  return (fieldCount / 5) * 100;
}
// 6
// Функция canWithdraw(user: UserProfile): boolean
// Вывод средств возможен, только если:
// ✅ isVerified === true
// ✅ Заполнены firstName И lastName (не undefined и не пустая строка)
// ✅ Заполнено country
// ✅ Заполнено currency
// Во всех остальных случаях — false
function canWithdraw(user: UserProfile): boolean {
  if (!user.isVerified) return false;
  if (!user.firstName || user.firstName === "") return false;
  if (!user.lastName || user.lastName === "") return false;
  if (!user.country) return false;
  if (!user.currency) return false;
  return true;
}
// Тест 1: Пустой профиль (только обязательные поля)
const user1: UserProfile = {
  id: "1",
  email: "a@a.com",
  isVerified: true,
};
getProfileCompleteness(user1); // 0/5 = 0% ✅

// Тест 2: Заполнены firstName и country
const user2: UserProfile = {
  id: "2",
  email: "b@b.com",
  isVerified: true,
  firstName: "Alice",
  country: "ru",
};
getProfileCompleteness(user2); // 2/5 = 40% ✅

// Тест 3: Все опциональные поля
const user3: UserProfile = {
  id: "3",
  email: "c@c.com",
  isVerified: true,
  firstName: "Bob",
  lastName: "Smith",
  country: "us",
  currency: "USD",
  phone: "123",
};
getProfileCompleteness(user3); // 5/5 = 100% ✅

console.log(getDisplayName(user1));
console.log(getProfileCompleteness(user1));
console.log(canWithdraw(user1));

console.log(getDisplayName(user2));
console.log(getProfileCompleteness(user2));
console.log(canWithdraw(user2));

console.log(getDisplayName(user3));
console.log(getProfileCompleteness(user3));
console.log(canWithdraw(user3));
