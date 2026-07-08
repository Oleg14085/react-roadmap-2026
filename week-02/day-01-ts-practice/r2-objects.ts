export {};

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  isbn?: string;
  rating?: number;
}

function getBookSummary(book: Book): string {
  const base = `${book.title} (${book.year}) by ${book.author}`;
  // Проверяем именно на undefined, чтобы рейтинг 0 тоже сработал
  if (book.rating !== undefined) {
    return `${base} | Рейтинг: ${book.rating}/10`;
  }
  return base;
}

function hasISBN(book: Book): boolean {
  // Проверяем, что это строка и она не пустая
  return typeof book.isbn === 'string' && book.isbn.length > 0;
}

// === ТЕСТЫ ===
const book1: Book = { id: 1, title: "The Hobbit", year: 1937, author: "Tolkien", rating: 9, isbn: "123-abc" };
const book2: Book = { id: 2, title: "1984", year: 1949, author: "Orwell" }; // без rating и isbn
const book3: Book = { id: 3, title: "Test", year: 2024, author: "Me", isbn: "" }; // пустой isbn
const book4: Book = { id: 4, title: "Zero", year: 2020, author: "Test", rating: 0 }; // рейтинг 0!

console.log(getBookSummary(book1)); // The Hobbit (1937) by Tolkien | Рейтинг: 9/10
console.log(getBookSummary(book2)); // 1984 (1949) by Orwell
console.log(getBookSummary(book4)); // Zero (2020) by Test | Рейтинг: 0/10  ← важно!
console.log(hasISBN(book1));        // true
console.log(hasISBN(book3));        // false (пустая строка)