class ConnectionManager {
  constructor() {
    this.connections = new Map();
  }

  connect(user, socket) {
    this.connections.set(user, socket);
  }

  disconnect(user) {
    return this.connections.delete(user);
  }

  getActiveCount() {
    return this.connections.size;
  }

  broadcast(message) {
    this.connections.forEach((socket) => {
      socket.send(message);
    });
  }
}

// === ТЕСТЫ (Скопируй и проверь свой код с ними) ===
const manager = new ConnectionManager();

const user1 = { id: 1, name: "Alice" };
const user2 = { id: 2, name: "Bob" };

// Фейковые сокеты для теста
const socket1 = { send: (msg) => console.log(`Socket 1 получил: ${msg}`) };
const socket2 = { send: (msg) => console.log(`Socket 2 получил: ${msg}`) };

manager.connect(user1, socket1);
manager.connect(user2, socket2);

console.log("Активных подключений:", manager.getActiveCount()); // Должно быть 2

console.log("Рассылка:");
manager.broadcast("Всем привет!"); // Должно вывести два сообщения в консоль

console.log("Отключаем Alice:", manager.disconnect(user1)); // true
console.log("Отключаем Alice повторно:", manager.disconnect(user1)); // false

console.log("Активных подключений:", manager.getActiveCount()); // Должно быть 1

console.log("Рассылка после отключения:");
manager.broadcast("Тут только Боб"); // Должно вывести только одно сообщение
