// Объяви тип UserRole, который разрешает только: 'admin', 'editor', 'viewer'.
// Объяви тип UserID, который может быть number или string.
type UserRole ='admin'|'editor'|'viewer';
type UserID = number|string;

// Напиши функцию getRoleLabel(role: UserRole): string, которая возвращает:
// 'admin' → 'Администратор'
// 'editor' → 'Редактор'
// 'viewer' → 'Наблюдатель'
function getRoleLabel(role:UserRole): string{
    if(role==='admin'){
        return 'Администратор'
    }
    else if(role==='editor'){
        return 'Редактор'
    }
    else{
        return 'Наблюдатель'
    }
}

function formatUserId(id: UserID): string{
    if(typeof id === 'string'){
      return `${id}`
    }
    else{
        return `ID: ${id}`
    }
}
console.log(getRoleLabel('admin'))
console.log(formatUserId(42))
console.log(formatUserId('sadasd'))