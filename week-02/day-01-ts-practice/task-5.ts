export {};
interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  tags: string[];
  meta?: { stock: number; rating?: number };
}

// 1. Utility Types
type ProductPreview = Pick<Product,'id'|'title'>; // Pick<Product, ...>
type ProductPublic = Omit<Product,'meta'>;  // Omit<Product, ...>
type ProductDraft = Partial<Product>;   // Partial<Product>

// 2. Функция превью
function toPreview(product: Product): ProductPreview {
  return {
    id:product.id,
    title:product.title
  }
    
  // верни объект только с id и title
}

// 3. Функция обновления черновика
function updateDraft(draft: ProductDraft, updates: ProductDraft): ProductDraft {
  return {...draft,...updates}// верни новый объект, объединяя draft и updates
}

// === ПРОВЕРКА ===
const product: Product = {
  id: 1,
  title: "Keyboard",
  price: 99.99,
  tags: ["electronics"],
  meta: { stock: 10 }
};

const preview: ProductPreview = toPreview(product);
console.log(preview); 
// expected: { id: 1, title: "Keyboard" }
// preview.price // ❌ Ошибка TS: Property 'price' does not exist on type 'ProductPreview'

const draft: ProductDraft = { title: "New Title" };
const updated = updateDraft(draft, { price: 89.99 });
console.log(updated);
// expected: { title: "New Title", price: 89.99 }