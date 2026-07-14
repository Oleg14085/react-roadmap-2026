export {}
type ThemeColor = string | [number, number, number];
type ThemeConfig = Record<string, ThemeColor>;
const appTheme = {
    primary:'#ff0000',
    secondary:[0,255,0]
} satisfies ThemeConfig;
appTheme.primary.toUpperCase();
appTheme.secondary.push(128);


type TextNotification = { id: number; text: string };
type ImageNotification = { id: number; imageUrl: string };
function renderNotification(notif: TextNotification | ImageNotification){
    if("text"in notif){
       console.log(`Текст: [значение ${notif.text}]`)
    }
    else{
        console.log(`Картинка: [значение ${notif.imageUrl}]`)
    }
}


const rawServerData:unknown = { name: "Админ", role: "superuser" };
interface User{name:string, role:string }
const rawServerData1 = rawServerData as User 
console.log(`Привет, [${rawServerData1.name}], твоя роль: [${rawServerData1.role}]`)