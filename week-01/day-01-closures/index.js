function createCounter(initial = 0) {
  let count = initial;
  return {
    increment() {
      return ++count; 
    },
    decrement() {
      return --count;
    },
    reset() {
      count = initial;
      return count;
    },
    getValue() {
      return count;
    },
  };
}


const c1 = createCounter(5);
const c2 = createCounter(10);
console.log("📊 Counters:", c1.increment(), c2.decrement(), c1.getValue(), c2.getValue());

function createMemoizer(fn) {
  const cache = new Map(); 

  return function (arg) {
    if (cache.has(arg)) {
      console.log("♻️ Cache hit");
      return cache.get(arg); 
    }
    
    const result = fn(arg);
    cache.set(arg, result);
    console.log("🆕 Calculated");
    return result;
  };
}

const square = createMemoizer((n) => {
  console.log(`⏳ Вычисляю ${n}^2...`);
  return n * n;
});

console.log("\n🧠 Memoizer:");
console.log(square(4)); 
console.log(square(4)); 
console.log(square(7)); 