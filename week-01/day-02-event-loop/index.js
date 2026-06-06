function runAsyncRace() {
  console.log("1. Sync"); //сначала синхронный код
  setTimeout(() => console.log("2. setTimeout"), 0); // После всех микротасков и перерисовки экрана
  Promise.resolve().then(() => console.log("3. Promise")); // Сразу после текущего синхронного кода, до рендеринга
  console.log("4. Sync end"); //сначала синхронный код
}
runAsyncRace();

function simplePromiseAll(promises){
  return new Promise((resolve,reject)=>{
    const result = new Array(promises.length)
    let resolvedCount = 0
    promises.forEach((promise,index)=>{
      promise
      .then((value)=>{
        result[index]=value
        resolvedCount++
        if(promises.length===resolvedCount){
          resolve(result)
      }
      })
      .catch((error)=>reject(error))
    })
  })
}
simplePromiseAll([
  new Promise((res) => setTimeout(() => res("A"), 100)),
  new Promise((res) => setTimeout(() => res("B"), 50)),
  new Promise((_,rej) => setTimeout(() => rej("❌ Fail"), 20)),
])
  .then(console.log)
  .catch(console.error);

