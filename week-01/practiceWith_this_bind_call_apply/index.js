const dog = {
  name: "Шарик",
  bark: function() {
    console.log(this.name + " говорит: Гав!");
  }
};

dog.bark(); // Строка А выведет Шарик говорит: Гав!

const myBarkFunction = dog.bark.call(dog);// Строка Б  Если нужно вызвать результат сразу то добавляем call или apply и он сам вызывается
//myBarkFunction(); если нужно вызвать не сразу то применяем встреные метод функции bind()  const myBarkFunction = dog.bark.bind(dog)


const employee1 = { name: "Алексей", role: "Frontend" };
const employee2 = { name: "Мария", role: "Designer" };

function introduce(greeting, city) {
  console.log(`${greeting}, я ${this.name}, я работаю как ${this.role} в городе ${city}.`); //с помощью методо call мы указываем с каким обьектом вызвать функцию,первым аргументом обьект
}
introduce.call(employee1,'Привет','Москва')
introduce.call(employee2,'Здравствуйте','Санкт-Петербург')
// Твое задание:
// 1. Вызови функцию для employee1 с аргументами "Привет" и "Москва"
// 2. Вызови функцию для employee2 с аргументами "Здравствуйте" и "Санкт-Петербург"

const rpgCharacter = {
  name: "Воин",
  equip: function(weapon, armor, potion) {
    console.log(`${this.name} экипирован: ${weapon}, ${armor} и выпил ${potion}.`);
  }
};

const inventory = ["Меч тысячи истин", "Латные доспехи", "Зелье лечения"];

// Твое задание:
// Вызови метод equip для объекта rpgCharacter, передав элементы массива inventory как аргументы, используя apply.
rpgCharacter.equip.apply(rpgCharacter,inventory)

const coffeeMachine = {
  brand: "Bosch",
  startBrewing: function() {
    setTimeout(function() {
      console.log(`Кофеварка ${this.brand} начала готовить кофе!`);
    }.bind(coffeeMachine), 1000);
    }
};

coffeeMachine.startBrewing(); // Через секунду выведет ошибку или "Кофеварка undefined начала..."

function printUsers() {
  // arguments - это псевдомассив. 
  // Если попробовать arguments.join(', '), будет ошибка!
console.log([].join.call(arguments,', '))
  // ТВОЕ ЗАДАНИЕ:
  // "Одолжи" метод join у обычного массива, чтобы вывести все имена 
  // из arguments одной строкой через запятую.
  // Используй call или apply.
  // Подсказка: сам метод join лежит тут: Array.prototype.join
}

printUsers("Аня", "Боря", "Вова"); 
// Ожидаемый вывод в консоли: "Аня, Боря, Вова"
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log("Счетчик:", this.count);
  }
};

// Имитация кнопки
const button = {
  click: function(callback) {
    callback(); // Вызываем переданную функцию
  }
};

// Мы хотим, чтобы при клике увеличивался счетчик
//button.click(counter.increment()) ПРОБЛЕМА: Выведет "Счетчик: NaN", потому что this потерялся!
button.click(counter.increment.bind(counter));





const prices = [150, 300, 50, 999, 200];

// Math.max(150, 300, 50, 999, 200) вернет 999
// Но у нас массив! Math.max(prices) не сработает (вернет NaN)

// ТВОЕ ЗАДАНИЕ:
// Используй apply, чтобы передать элементы массива prices в Math.max
// и найти максимальную цену.
console.log(Math.max.apply(null,prices))



// У нас есть объект пользователя и функция для обновления данных. 
// Нужно вызвать функцию с правильным контекстом И передать аргументы из массива.

const user = {
  name: "Алекс",
  email: "alex@example.com"
};

const updates = ["Новое имя", "newemail@example.com"];

function updateProfile(newName, newEmail) {
  this.name = newName;
  this.email = newEmail;
  console.log(`Обновлено: ${this.name}, ${this.email}`);
}
updateProfile.apply(user,updates)
// ТВОЕ ЗАДАНИЕ:
// Вызови функцию updateProfile так, чтобы:
// 1. this указывал на объект user
// 2. Аргументы newName и newEmail взялись из массива updates
// Используй apply!

