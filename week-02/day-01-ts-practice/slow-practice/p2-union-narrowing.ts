export {};
//1 Объяви тип PaymentMethod, который разрешает только: 'card', 'cash', 'crypto'.
type PaymentMethod = "card" | "cash" | "crypto";
//2 Объяви тип PaymentStatus, который разрешает только: 'pending', 'completed', 'failed'.
type PaymentStatus = "pending" | "completed" | "failed";
//3
// Объяви интерфейс Payment с полями:
// id: string
// amount: number
// method: PaymentMethod
// status: PaymentStatus
// receiptUrl?: string (опционально)
interface Payment {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  receiptUrl?: string;
}
//4
// Напиши функцию getPaymentLabel(status: PaymentStatus): string, которая возвращает:
// 'pending' → 'В обработке'
// 'completed' → 'Оплачено'
// 'failed' → 'Ошибка'
function getPaymentLabel(status: PaymentStatus): string {
  if (status === "pending") {
    return "В обработке";
  }
  if (status === "completed") {
    return "Оплачено";
  } else {
    return "Ошибка";
  }
}
//5
// Напиши функцию formatPayment(payment: Payment): string, которая возвращает:
// Если есть receiptUrl: "{amount}₽ ({method}) - {statusLabel} [Чек: {receiptUrl}]"
// Если нет receiptUrl: "{amount}₽ ({method}) - {statusLabel}"
// Пример: "1500₽ (card) - Оплачено [Чек: https://...]"
function formatPayment(format: Payment): string {
    const statusLabel = getPaymentLabel(format.status);
  if (format.receiptUrl) {
    return `${format.amount}₽ (${format.method}) - ${statusLabel} [Чек: ${format.receiptUrl}]`;
  } else {
    return `${format.amount}₽ (${format.method}) - ${statusLabel}`;
  }
}
//6
// Напиши функцию canRefund(payment: Payment): boolean, которая возвращает true только если:
// status — 'completed'
// И method — 'card' или 'crypto' (наличные не возвращаем)
// Во всех остальных случаях — false
function canRefund(payment: Payment): boolean {
  if (payment.status === "completed"&& (payment.method === 'card' || payment.method === 'crypto')) {
    return true;
  } else {
    return false;
  }
}
//7
// В конце файла:
// Создай минимум 3 объекта Payment с разными комбинациями полей
// Выведи в консоль результаты всех трёх функций для каждого платежа
// Убедись, что опциональное поле receiptUrl обработано корректно (и когда есть, и когда нет)
const payment1: Payment = {
  id: "1",
  amount: 1,
  method: "card",
  status: "pending",
};
const payment2: Payment = {
  id: "2",
  amount: 2,
  method: "cash",
  status: "completed",
  receiptUrl: "https://...",
};
const payment3: Payment = {
  id: "3",
  amount: 3,
  method: "crypto",
  status: "failed",
};
const payment4: Payment = {
  id: "4",
  amount: 100,
  method: "card",      
  status: "completed"  
};

console.log(getPaymentLabel(payment1.status));
console.log(getPaymentLabel(payment2.status));
console.log(getPaymentLabel(payment3.status));

console.log(formatPayment(payment1));
console.log(formatPayment(payment2));
console.log(formatPayment(payment3));

console.log(canRefund(payment1));
console.log(canRefund(payment2));
console.log(canRefund(payment3));
console.log(canRefund(payment4))