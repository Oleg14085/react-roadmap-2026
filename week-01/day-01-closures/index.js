function createCounter(initial = 0) {
  let count = initial;
  return {
    increment() {
      return count++;
    },
    decrement() {
      return count--;
    },
    reset() {
      return (count = 0);
    },
    getValue() {
      return count;
    },
  };
}
let counter1 = createCounter();
let counter2 = createCounter();
counter1.increment();
counter2.decrement();
console.log(counter1.getValue());
console.log(counter2.getValue());

function createMemoizer(fn) {
 const cash = new Map();
 return function(arg){
  if(cash.has(arg)){
    console.log('♻️ Cache hit')
    return cash
  }else{
    const result = fn(arg);
    cash.set(arg,result);
    console.log('🆕 Calculated');
    return result
  }
 }
  
}
