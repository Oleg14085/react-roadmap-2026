export {};
//1️⃣ Объяви интерфейс User
interface User {
  id: string;
  name: string;
  age: number;
}
// 2️⃣ Объяви тип UserDatabase
// Используй Record, чтобы создать тип словаря, где:
// Ключ: string (это будет id пользователя)
// Значение: User
type UserDatabase = Record<string, User>;

// 3️⃣ Функция createEmptyDatabase<T extends { id: string }>(): Record<string, T>
// Возвращает пустой объект {}, типизированный как Record<string, T>
// Дженерик <T> позволяет использовать функцию для любых сущностей с полем id
function createEmptyDatabase<T extends { id: string }>(): Record<string, T> {
  return {};
}
// 4️⃣ Функция addToDatabase<T extends { id: string }>(db: Record<string, T>, item: T): Record<string, T>
// Принимает текущий словарь и новый объект
// Возвращает НОВЫЙ словарь, где item.id становится ключом, а item — значением
// Не мутируй исходный db (используй spread)
function addToDatabase<T extends { id: string }>(
  db: Record<string, T>,
  item: T,
): Record<string, T> {
  return {
    ...db,
    [item.id]: item,
  };
}

// 5️⃣ Функция getFromDatabase<T>(db: Record<string, T>, id: string): T | undefined
// Возвращает элемент по ключу или undefined, если ключа нет
function getFromDatabase<T>(db: Record<string, T>, id: string): T | undefined {
  return db[id];
}

function filterByAge<T extends { age: number }>(
  db: Record<string, T>,
  minAge: number,
): T[] {
  return Object.values(db).filter((item) => item.age >= minAge);
}

// === ТЕСТЫ ===

// 1. Создай пустую базу для User
const db = createEmptyDatabase<User>();

// 2. Добавь 3 пользователя (цепочкой, чтобы видеть иммутабельность)
const db1 = addToDatabase(db, { id: "u1", name: "Alice", age: 24 });
const db2 = addToDatabase(db1, { id: "u2", name: "Bob", age: 30 });
const db3 = addToDatabase(db2, { id: "u3", name: "Charlie", age: 28 });

// 3. Получи пользователя по ID
const bob = getFromDatabase(db3, "u2");
console.log("🔍 Bob:", bob);
// expected: { id: "u2", name: "Bob", age: 30 }

// 4. Отфильтруй по возрасту >= 25
const adults = filterByAge(db3, 25);
console.log("🎂 Adults (age >= 25):", adults);
// expected: массив из Bob (30) и Charlie (28)

// 5. Проверь иммутабельность (исходные объекты не должны меняться)
console.log("🛡️ Исходный db (должен быть пуст):", db);
console.log("🛡️ db3 (должен иметь 3 пользователя):", Object.keys(db3).length);
