async function fetchWithRetry(url, retries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      if (attempt === retries) {
        throw new Error(`Failed after ${retries} retries: ${err.message}`);
      }
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`⏳ Попытка ${attempt} failed. Ждём ${delay}мс...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

fetchWithRetry("https://jsonplaceholder.typicode.com/posts/4")
  .then((data) => console.log("✅ Успех:", data.title))
  .catch((err) => console.error("❌ Ошибка:", err.message));

const user1 = {
  name1: "John Doe",
  age1: 30,
  
}
const user2 ={
  name2: "Jane Smith",
  age2: 25,
}
const users = {user1, user2}
console.log(users)