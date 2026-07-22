// 1️⃣ Объяви интерфейс EventItem
interface EventItem {
  id: string;
  title: string;
  date: string; // формат "YYYY-MM-DD"
  isPublic: boolean;
}
// 2️⃣ Объяви тип EventRegistry
// Используй Record, чтобы создать тип словаря, где:
// Ключ: string (это будет id события)
// Значение: EventItem
type EventRegistry = Record<string, EventItem>;
// 3️⃣ Функция createEmptyRegistry<T extends { id: string }>()
// Возвращает пустой объект {}, типизированный как Record<string, T>
// Дженерик позволяет использовать функцию для любых сущностей с полем id
function createEmptyRegistry<T extends { id: string }>(): Record<string, T> {
  return {};
}
// 4️⃣ Функция addEvent<T extends { id: string }>(registry: Record<string, T>, event: T)
// Возвращает НОВЫЙ словарь, где event.id становится ключом, а event — значением
// Не мутируй исходный registry
function addEvent<T extends { id: string }>(
  registry: Record<string, T>,
  event: T,
): Record<string, T> {
  return {
    ...registry,
    [event.id]: event,
  };
}
// 5️⃣ Функция getEvent<T>(registry: Record<string, T>, id: string)
// Возвращает элемент по ключу или undefined, если ключа нет
function getEvent<T>(registry: Record<string, T>, id: string): T | undefined {
  return registry[id];
}
// 6️⃣ Функция getPublicEvents<T extends { isPublic: boolean }>(registry: Record<string, T>)
// Возвращает массив всех событий, у которых isPublic === true
// Используй Object.values() для получения массива значений из словаря
function getPublicEvents<T extends { isPublic: boolean }>(
  registry: Record<string, T>,
): T[] {
  return Object.values(registry).filter((el) => el.isPublic);
}
// 1. Пустой реестр
const registry = createEmptyRegistry<EventItem>();

// 2. Добавь 3 события
const r1 = addEvent(registry, { id: "e1", title: "Meeting", date: "2024-06-01", isPublic: false });
const r2 = addEvent(r1, { id: "e2", title: "Conference", date: "2024-07-15", isPublic: true });
const r3 = addEvent(r2, { id: "e3", title: "Workshop", date: "2024-08-20", isPublic: true });

// 3. Получи событие по ID
const conf = getEvent(r3, "e2");
console.log(conf);  // expected: { id: "e2", title: "Conference", ... }

// 4. Отфильтруй публичные события
const publicEvents = getPublicEvents(r3);
console.log(publicEvents);  // expected: массив из 2 событий (e2 и e3)

// 5. Проверь иммутабельность
console.log(registry);  // expected: {} (исходный не изменился)
console.log(Object.keys(r3).length);  // expected: 3