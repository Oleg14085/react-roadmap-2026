export { }
type SetStateAction<T> = T | ((prev: T) => T);
function useState<T>(initial: T): [T, (action: SetStateAction<T>) => void] {
    let state = initial;
    const setState = (action: SetStateAction<T>) => {
        state = typeof action === 'function' ? (action as (prev: T) => T)(state) : action;
    };
    return [state, setState];
}
interface RegisterForm {
    username: string;
    email: string;
    age: number;
    subscribe: boolean;
}


// 2. Компонент (логика хуков)
function RegisterFormComponent() {
    const [form, setForm] = useState<RegisterForm>({
        username: '',
        email: '',
        age: 0,
        subscribe: false
    })

    const updateField = (field: keyof RegisterForm, value: string | number | boolean) => {
        setForm((prev: RegisterForm) => {
            return {
                ...prev,
                [field]: value
            }

        })
    }

    return { form, updateField };
}

// 3. Валидация
function validateForm(form: RegisterForm): string[] {
    const errors: string[] = [];

    // 1. username: не пустой и минимум 3 символа
    if (!form.username || form.username.length < 3) {
        errors.push("username должен содержать минимум 3 символа");
    }

    // 2. email: должен содержать @
    if (!form.email.includes('@')) {
        errors.push("email должен содержать символ @");
    }

    // 3. age: от 18 до 100 включительно
    if (form.age < 18 || form.age > 100) {
        errors.push("age должен быть от 18 до 100");
    }

    // 4. subscribe — по ТЗ всегда ок, не проверяем

    return errors;
}
// Тест 1: Валидная форма → ошибок нет
const valid: RegisterForm = { username: "alice", email: "a@a.com", age: 25, subscribe: true };
console.log(validateForm(valid)); // expected: []

// Тест 2: Ошибки валидации
const invalid: RegisterForm = { username: "ab", email: "no-at", age: 10, subscribe: false };
console.log(validateForm(invalid)); // expected: ["username...", "email...", "age..."]