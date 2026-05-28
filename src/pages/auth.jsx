import { useState } from "react";
import { useAuth } from "../AuthContext"; 
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
                    <div className="authT">
                        Войдите в свой аккаунт или зарегистрируйтесь для начала
                    </div>
                </div>
                {mode === "login" ? (
                    <LoginForm onSwitchToRegister={() => setMode("register")} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setMode("login")} />
                )}
            </div>
        </div>
    );
}

function LoginForm({ onSwitchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { fetchBookings } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const text = await res.text();
                setError(text || "Ошибка входа");
                return;
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            const userRes = await fetch("http://localhost:8080/api/auth/me", {
                headers: { Authorization: `Bearer ${data.token}` },
            });
            if (userRes.ok) {
                const rawUser = await userRes.json();
                const user = {
                    id: rawUser.id,
                    firstName: rawUser.first_name,
                    lastName: rawUser.last_name,
                    email: rawUser.email,
                    phone: rawUser.phone,
                    membershipType: rawUser.membership_type,
                    role: rawUser.role || "user",
                    joinDate: rawUser.join_date,
                };

                localStorage.setItem("currentUser", JSON.stringify(user));
            }
            await fetchBookings();
            window.location.reload();
        } catch (err) {
            setError("Сервер недоступен");
        }
    };

    return (
        <form className="authForm" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className="authForm">
                <label className="d-flex mb-1 inputText">Email</label>
                <input
                    className="mb-1 authInput"
                    type="email"
                    placeholder="ivanIvanov@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="d-flex mb-1 inputText">Пароль</label>
                <input
                    className="mb-1 authInput"
                    type="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="submitButt">Войти</button>
            <div className="authToRegButt d-flex">
                <div className="authToRegButtText">Ещё нет своего аккаунта?</div>
                <button type="button" className="linkButt" onClick={onSwitchToRegister}>
                    Зарегистрируйтесь
                </button>
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
    const { fetchBookings } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Пароль должен быть не менее 6 символов");
            return;
        }
        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: surName,
                    email,
                    phone,
                    password,
                }),
            });
            if (!res.ok) {
                const text = await res.text();
                setError(text || "Ошибка регистрации");
                return;
            }
            const loginRes = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (loginRes.ok) {
                const data = await loginRes.json();
                localStorage.setItem("token", data.token);
                const userRes = await fetch("http://localhost:8080/api/auth/me", {
                    headers: { Authorization: `Bearer ${data.token}` },
                });
                if (userRes.ok) {
                    const rawUser = await userRes.json();
                    const user = {
                        id: rawUser.id,
                        firstName: rawUser.first_name,
                        lastName: rawUser.last_name,
                        email: rawUser.email,
                        phone: rawUser.phone,
                        membershipType: rawUser.membership_type,
                        role: rawUser.role || "user",
                        joinDate: rawUser.join_date,
                    };
                    localStorage.setItem("currentUser", JSON.stringify(user));
                }
                await fetchBookings();
                window.location.reload();
            } else {
                setError("Регистрация прошла, но не удалось войти");
            }
        } catch (err) {
            setError("Сервер недоступен");
        }
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