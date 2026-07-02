// Объяви тип ProductFilter, который описывает функцию:
// Принимает product: Product
// Возвращает boolean
export {};
type ProductFilter = (product:Product) => boolean;

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags: string[];
}
// Возвращает новый массив товаров, для которых filter(product) === true
// Используй .filter()
// Не мутируй исходный массив

function filterProducts(products: Product[], filter: ProductFilter): Product[]{
  return products.filter((product)=>filter(product))
}
// Возвращает объект, где ключ — тег, значение — массив товаров с этим тегом
// Пример вывода: { electronics: [prod1, prod2], books: [prod3] }
// Используй .reduce() или цикл + присваивание в объект
function groupByTag(products: Product[], tag: string): Record<string, Product[]> {
  return products.reduce((acc, product) => {
    // 1. Проверяем, есть ли у продукта этот тег
    if (product.tags.includes(tag)) {
      // 2. Если группы ещё нет — создаём пустой массив
      if (!acc[tag]) {
        acc[tag] = [];
      }
      // 3. Кладём продукт в нужную группу
      acc[tag].push(product);
    }
    return acc;
  }, {} as Record<string, Product[]>);
}
const products: Product[] = [
  { id: 1, name: "Laptop", price: 1200, inStock: true, tags: ["electronics", "sale"] },
  { id: 2, name: "Mouse", price: 25, inStock: true, tags: ["electronics"] },
  { id: 3, name: "Book", price: 15, inStock: false, tags: ["books"] }
];

console.log(filterProducts(products, p => p.price < 50));
// [ { id: 2, ... }, { id: 3, ... } ]

console.log(filterProducts(products, p => p.inStock));
// [ { id: 1, ... }, { id: 2, ... } ]

console.log(groupByTag(products, "electronics"));
// { electronics: [ { id: 1, ... }, { id: 2, ... } ] }

console.log(products); // исходный массив НЕ должен измениться