export {};
type Id = string | number;
function isStringId(value:Id): value is string {
    return typeof value === 'string'
}
function formatId(id:Id):string {
    if(isStringId(id)){
        return `Строка: ${id}`
    }
    else{
        return `Число: ${id}`
    }
}
console.log(formatId("user-123"));
console.log(formatId(456));