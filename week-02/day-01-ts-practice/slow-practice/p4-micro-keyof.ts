interface Settings {
  theme: "light" | "dark";
  lang: "ru" | "en" | "es";
  notifications: boolean;
  fontSize: number;
}
//2 Объяви тип SettingsKeys. Используй keyof, чтобы создать union всех ключей интерфейса Settings.
type SettingsKeys = keyof Settings;
// 3 Функция getSettingType(key: SettingsKeys): string
// Возвращает название типа для переданного ключа:
// "theme" → "union" (потому что "light" | "dark")
// "lang" → "union"
// "notifications" → "boolean"
// "fontSize" → "number"
function getSettingType(key: SettingsKeys): string {
  if (key === "theme" || key === "lang") {
    return "union"; // потому что значения — это union литералов
  }
  if (key === "notifications") {
    return "boolean";
  }
  if (key === "fontSize") {
    return "number";
  }
  return "unknown"; // на всякий случай
}
//4
//  Функция getDefaultValue(key: SettingsKeys): Settings[keyof Settings]
// Возвращает дефолтное значение для ключа:
// "theme" → "light"
// "lang" → "ru"
// "notifications" → true
// "fontSize" → 16
// 💡 Тип возврата Settings[keyof Settings] — это union всех возможных значений интерфейса: "light" | "dark" | "ru" | "en" | "es" | boolean | number. TS сам выведет его.
function getDefaultValue(
  key: SettingsKeys,
): Settings[keyof Settings] {
  // Возвращаем значение в зависимости от ключа
  if (key === "theme") {
    return "light"; // ✅ Тип "light" входит в Settings[keyof Settings]
  }
  if (key === "lang") {
    return "ru"; // ✅ Тип "ru" входит в Settings[keyof Settings]
  }
  if (key === "notifications") {
    return true; // ✅ boolean входит в Settings[keyof Settings]
  }
  if (key === "fontSize") {
    return 16; // ✅ number входит в Settings[keyof Settings]
  }
  throw new Error(`Unknown key: ${key}`)
  // TS знает, что key — это один из 4 ключей, поэтому unreachable code не нужен
}
// 5
// Функция updateSetting<T extends keyof Settings>(settings: Settings, key: T, value: Settings[T]): Settings
// Принимает текущие настройки, ключ и новое значение
// Возвращает новый объект с обновлённым полем (не мутируй исходный!)
// Используй дженерик <T extends keyof Settings>, чтобы TS знал: value должен соответствовать типу поля key
function updateSetting<T extends keyof Settings>(
  settings: Settings,
  key: T,
  value: Settings[T], // ← "тип значения для ключа T"
): Settings {
  return {
    ...settings,
    [key]: value, // ← обновляем поле по ключу
  };
}
// Начальные настройки
const defaultSettings: Settings = {
  theme: "light",
  lang: "ru",
  notifications: true,
  fontSize: 16,
};
// Тест 1: getSettingType
console.log(getSettingType("theme")); // expected: "union"
console.log(getSettingType("fontSize")); // expected: "number"

// Тест 2: getDefaultValue
console.log(getDefaultValue("lang")); // expected: "ru"
console.log(getDefaultValue("notifications")); // expected: true

// Тест 3: updateSetting
const updated = updateSetting(defaultSettings, "theme", "dark");
console.log(updated.theme); // expected: "dark"
console.log(defaultSettings.theme); // expected: "light" (исходный не изменён!)

// Тест 4: TS должен ругаться, если тип значения не совпадает
//updateSetting(defaultSettings, "fontSize", "big"); // ❌ Раскомментируй и проверь, что TS подсветит ошибку
