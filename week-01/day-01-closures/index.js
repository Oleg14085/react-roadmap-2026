function createCounter(initial = 0) {
  let count = initial;
  return {
    increment() {
      return ++count; // 🔑 сначала увеличиваем, потом возвращаем
    },
    decrement() {
      return --count;
    },
    reset() {
      count = initial; // 🔑 сброс к исходному значению, а не к 0
      return count;
    },
    getValue() {
      return count;
    },
  };
}

// Проверка счётчиков
const c1 = createCounter(5);
const c2 = createCounter(10);
console.log("📊 Counters:", c1.increment(), c2.decrement(), c1.getValue(), c2.getValue());

function createMemoizer(fn) {
  const cache = new Map(); // 🔑 переименовал cash → cache для чистоты

  return function (arg) {
    if (cache.has(arg)) {
      console.log("♻️ Cache hit");
      return cache.get(arg); // 🔑 возвращаем сохранённое ЗНАЧЕНИЕ, а не Map
    }
    
    const result = fn(arg);
    cache.set(arg, result);
    console.log("🆕 Calculated");
    return result;
  };
}

// Проверка мемоизатора
const square = createMemoizer((n) => {
  console.log(`⏳ Вычисляю ${n}^2...`);
  return n * n;
});

console.log("\n🧠 Memoizer:");
console.log(square(4)); // 🆕 Calculated → 16
console.log(square(4)); // ♻️ Cache hit → 16
console.log(square(7)); // 🆕 Calculated → 49