import { useState } from "react";
import "./auth.css";

function Auth({ isOpen, onClose }) {
    const [mode, setMode] = useState("login");
    if (!isOpen) return null;

    return (
        <div className="authW" onClick={onClose}>
            <div className="auth" onClick={(e) => e.stopPropagation()}>
                <button className="closeButt" onClick={onClose}>×</button>
                <div className="authTW">
                    <div className="authBT">Добро пожаловать в POWERFIT</div>
                    <div className="authT">Войдите в свой аккаунт или зарегистрируйтесь для начала</div>
                </div>
                {mode === "login" ?
                    (<LoginForm onSwitchToRegister={() => setMode("register")} />) : (<RegisterForm onSwitchToLogin={() => setMode("login")} />)}
            </div>
        </div>
    );
}

function LoginForm({ onSwitchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.reload();
        } else {
            setError("Неверный email или пароль");
        }
    };

    return (
        <form className="authForm" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}

            <div className="authForm">
                <label className="d-flex mb-1 inputText">Email</label>
                <input className="mb-1 authInput" type="email" placeholder="ivanIvanov@mail.ru" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label className="d-flex mb-1 inputText">Пароль</label>
                <input className="mb-1 authInput" type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submitButt">Войти</button>
            <div className="authToRegButt d-flex">
                <div className="authToRegButtText">Ещё нет своего аккаунта?</div>
                <button type="button" className="linkButt" onClick={onSwitchToRegister}>Зарегистрируйтесь</button>
            </div>
        </form>
    );
}

function RegisterForm({ onSwitchToLogin }) {
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Пароль должен быть не менее 6 символов");
            return;
        }
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find(u => u.email === email)) {
            setError("Пользователь с таким email уже существует");
            return;
        } else if (users.find(u => u.phone === phone)) {
            setError("Пользователь с таким телефоном уже существует");
            return;
        }

        const newUser = {
            id: Date.now(),
            firstName: firstName,
            surName: surName,
            email: email,
            phone: phone,
            password: password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        window.location.reload();
    };

    return (
        <form className="authReg" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className="authForm">
                <label className="d-flex inputText">Имя</label>
                <input className="authInput mb-1" type="text" placeholder="Иван" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <label className="d-flex inputText">Фамилия</label>
                <input className="authInput mb-1" type="text" placeholder="Иванов" value={surName} onChange={(e) => setSurName(e.target.value)} required />
                <label className="d-flex inputText">Email</label>
                <input className="authInput mb-1" type="email" placeholder="ivanIvanov@mail.ru" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label className="d-flex inputText">Телефон</label>
                <input className="authInput mb-1" type="tel" placeholder="+8 800-535-35-35" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <label className="d-flex inputText">Пароль</label>
                <input className="authInput mb-1" type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submitButt">Зарегистрироваться</button>
            <div className="authToRegButt d-flex">
                <div className="authToRegButtText">Уже есть аккаунт?</div>
                <button type="button" className="linkButt" onClick={onSwitchToLogin}>Войдите</button>
            </div>
        </form>
    );
}

export default Auth;