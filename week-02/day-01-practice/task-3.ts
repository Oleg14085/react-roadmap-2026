
interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  tags: string[];
  meta?: { stock: number; rating?: number }
}
type ProductFilter = (product: Product) => boolean;

// 2. Функция фильтрации
function filterProducts(products: Product[], filter: ProductFilter): Product[] {
  return products.filter(filter)
}

// 3. Группировка по тегу
function groupByTag(products: Product[], tag: string): Record<string, Product[]> {
  const result: Record<string, Product[]> = {} 
  return products.reduce((acc, product) => {
    if (product.tags.includes(tag)) {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(product);
    }
    return acc;
  }, result);
 
}

// === ПРОВЕРКА ===
const products: Product[] = [
  { id: 1, title: "Mouse", price: 25, tags: ["electronics"] },
  { id: 2, title: "Book", price: 15, tags: ["education"] },
  { id: 3, title: "Keyboard", price: 99, tags: ["electronics", "input"] }
];

console.log(filterProducts(products, p => p.price < 50));  
// expected: [{id:1,...}, {id:2,...}]

console.log(groupByTag(products, "electronics"));  
// expected: { electronics: [{id:1,...}, {id:3,...}] }