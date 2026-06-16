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