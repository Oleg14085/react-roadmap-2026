const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Carol", role: "admin" },
];
function groupBy(arr, key) {
  return arr.reduce((acc, user) => {
    const prop = user[key];
    if (!acc[prop]) {
      acc[prop] = [];
    }
    acc[prop].push(user);
    return acc;
  }, {});
}
console.log(groupBy(users, "role"));
//→ { admin: [{name:'Alice',...}, {name:'Carol',...}], user: [{name:'Bob',...}] }

const products = [
  { id: 1, name: "Ноутбук", price: 1200, inStock: true },
  { id: 2, name: "Мышь", price: 25, inStock: true },
  { id: 3, name: "Монитор", price: 400, inStock: false },
  { id: 4, name: "Клавиатура", price: 80, inStock: true }
];
 const filteredProducts = products.filter((el)=>el.inStock&&el.price>50).map((el)=>`${el.name} - ${el.price}$`)
 console.log(filteredProducts) //Ожидаемый вывод: ["Ноутбук - 1200$", "Клавиатура - 80$"]

 const cart = [
  { name: "Кофе", price: 5, qty: 2 },
  { name: "Сыр", price: 12, qty: 1 },     //Требуется: Вернуть объект { totalCost, totalItems, avgPricePerItem }
  { name: "Хлеб", price: 2, qty: 3 }
];

const stats = cart.reduce((acc,item)=>{
  const totalCost = item.price*item.qty;
  const totalItems = item.qty;
  acc.totalCost += totalCost;
  acc.totalItem +=totalItems;
  acc.avgPricePerItem = Number((acc.totalCost/acc.totalItem).toFixed(2))
  return acc
},{totalCost:0,totalItem:0})
console.log(stats) //Ожидаемый вывод: { totalCost: 28, totalItems: 6, avgPricePerItem: "4.67" }


const logs = [
  { type: "error", message: "DB timeout" },
  { type: "info", message: "Server start" },
  { type: "error", message: "Auth failed" },
  { type: "warn", message: "High CPU" }
];

const grouped = logs.reduce((acc, log) => {
  const key = log.type;
  if(!acc[key]){
    acc[key] = []
  }
  acc[key].push(log)
  return acc;
}, {});
console.log(grouped)
/*{
  error: [
    { type: "error", message: "DB timeout" },
    { type: "error", message: "Auth failed" }
  ],
  info: [{ type: "info", message: "Server start" }],
  warn: [{ type: "warn", message: "High CPU" }]
} */