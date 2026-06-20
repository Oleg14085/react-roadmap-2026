// 1. Объяви типы
type Status = "pending" | "shipped" | "delivered";
type ID = string | number;

// 2. Функция цвета
function getStatusColor(status: Status): string {
  if (status === "pending") {
    return "yellow";
  } else if (status === "shipped") {
    return "blue";
  }

  return "green";
}

// 3. Форматирование ID
function formatId(id: ID): string {
 
  if (typeof id === "string") {
    return `ID: ${id}`; // верни "ID: ..."
  } else {
    return `#${id}`; // верни "#..." (id здесь точно number)
  }
}

// === ПРОВЕРКА ===
console.log(getStatusColor("pending")); // expected: 'yellow'
console.log(getStatusColor("shipped")); // expected: 'blue'
console.log(formatId(123)); // expected: '#123'
console.log(formatId("abc-xyz")); // expected: 'ID: abc-xyz'
