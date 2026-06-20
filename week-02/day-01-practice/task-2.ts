// 1. Объяви интерфейс Product
interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  tags: string[];
  meta?: { stock: number; rating?: number }
}

// 2. Функция цены
function calculateFinalPrice(product: Product): number {
    if(product.discount){ 
      const value = product.price * (1 - product.discount)
      return parseFloat(value.toFixed(2))
    }
    return product.price
  // если product.discount есть → примени скидку
  // иначе → верни price
  // не забудь про округление
}

// 3. Функция тегов
function getTagsString(product: Product): string {
  if(product.tags&&product.tags.length>0){
    return product.tags.join(', ')// если tags есть и длина > 0 → верни join(', ')
  // иначе → "нет тегов"
}else{
    return "нет тегов"
}
}

// === ПРОВЕРКА ===
const product: Product = {
  id: 1,
  title: "Keyboard",
  price: 99.99,
  discount: 0.1,
  tags: ["electronics", "input"],
  meta: { stock: 15 }
};

console.log(calculateFinalPrice(product));  // expected: 89.99
console.log(getTagsString(product));        // expected: "electronics, input"
console.log(getTagsString({ ...product, tags: [] })); // expected: "нет тегов"