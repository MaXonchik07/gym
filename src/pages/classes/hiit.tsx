import { useState, useMemo } from "react";
import { Link } from "react-router";
import { useAuth } from "../../AuthContext";

function Hiit() {
    const { user, fetchBookings } = useAuth();
    const [notification, setNotification] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<{
        date: string;
        time: string;
        instructor: string;
    } | null>(null);

    const classData = {
        id: "hiit",
        name: "HIIT цикл",
        description: "Круговая тренировка высокой интенсивности для максимального жиросжигания.",
        duration: "40 мин",
        capacity: "16",
        difficulty: "Advanced",
        schedule: [
            { day: "Вторник", time: "18:00", instructor: "Алексей Ким" },
            { day: "Четверг", time: "18:00", instructor: "Алексей Ким" },
            { day: "Суббота", time: "18:00", instructor: "Алексей Ким" },
        ],
        benefits: [
            "Максимальное сжигание калорий",
            "Улучшение метаболизма",
            "Экономия времени",
            "Разнообразие упражнений",
        ],
    };

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const getDifficultyBadgeClass = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner": return "badge badgeBeginner";
            case "Intermediate": return "badge badgeIntermediate";
            case "Advanced": return "badge badgeAdvanced";
        }
    };

    const upcomingSlots = useMemo(() => {
        const slots: { date: string; time: string; instructor: string }[] = [];
        const today = new Date();
        const dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayName = dayNames[date.getDay()];
            const dateStr = date.toISOString().split("T")[0];

            classData.schedule.forEach((slot) => {
                if (slot.day === dayName) {
                    slots.push({
                        date: dateStr,
                        time: slot.time,
                        instructor: slot.instructor,
                    });
                }
            });
        }
        return slots;
    }, [classData.schedule]);

    const handleBook = async () => {
        if (!user) {
            showNotification("Пожалуйста, войдите в систему для записи");
            return;
        }
        if (!selectedSlot) {
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            showNotification("Ошибка авторизации. Попробуйте войти заново.");
            return;
        }

        const payload = {
            class_id: classData.id,
            class_name: classData.name,
            date: selectedSlot.date,
            time: selectedSlot.time,
            capacity: parseInt(classData.capacity, 10),
        };

        try {
            const res = await fetch("http://localhost:8081/api/bookings/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errText = await res.text();
                showNotification(errText || "Ошибка записи");
                return;
            }

            showNotification("Успешно записались!");
            setSelectedSlot(null);

            if (fetchBookings) {
                await fetchBookings();
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error("Booking error", error);
            showNotification("Ошибка сети при записи");
        }
    };

    return (
        <>
            {notification && <div className="notificationn">{notification}</div>}
            <div className="classBlock1">
                <div className="classOverlay hiitIMG">
                    <div className="classContent">
                        <Link to="/classes">
                            <button className="btn-back">
                                ← Назад к занятиям
                            </button>
                        </Link>
                        <h1 className="classTitle">{classData.name}</h1>
                        <div className="classBadge">
                            <div className={getDifficultyBadgeClass(classData.difficulty)}>
                                {classData.difficulty}
                            </div>
                            <div className="badge badgeComm">{classData.duration}</div>
                            <div className="badge badgeComm">До {classData.capacity} чел.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="classBlock2">
                <div className="row gap-5 mx-0 classBlock2Media">
                    <div className="col-lg-8">
                        <div className="profileStat">
                            <h2 className="profileStatTitle">Описание занятия</h2>
                            <p className="class-description">{classData.description}</p>
                        </div>
                        <div className="profileStat">
                            <h2 className="profileStatTitle">Что вы получите</h2>
                            <div className="benefits-grid">
                                {classData.benefits.map((b, idx) => (
                                    <div key={idx} className="benefit-item">
                                        <div className="classIcon4 profileInfoIcon1"></div>
                                        <div>{b}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg">
                        <div className="profileStat">
                            <h2 className="profileStatTitle">О занятии</h2>
                            <div className="sidebar-info">
                                <div className="info-item-sidebar">
                                    <div className="profileInfoIcon1 classIcon1"></div>
                                    <div>Длительность: {classData.duration}</div>
                                </div>
                                <div className="info-item-sidebar">
                                    <div className="profileInfoIcon1 classIcon2"></div>
                                    <div>Макс. {classData.capacity} чел.</div>
                                </div>
                                <div className="info-item-sidebar">
                                    <div className="profileInfoIcon1 classIcon3"></div>
                                    <div>Уровень: {classData.difficulty}</div>
                                </div>
                            </div>
                            <div className="sidebar-rules">
                                <p className="fw-bold mb-2">Важно:</p>
                                <ul>
                                    <li>Приходите за 10 минут до начала</li>
                                    <li>Возьмите воду и полотенце</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profileStat mt-4" id="slots-section">
                    <h2 className="profileStatTitle">Ближайшие занятия</h2>
                    <div className="vertical-slots-container">
                        {upcomingSlots.map((slot, idx) => {
                            const dateObj = new Date(slot.date);
                            const dayNum = dateObj.getDate();
                            const monthShort = dateObj.toLocaleDateString("ru-RU", { month: "short" });
                            const isSelected =
                                selectedSlot?.date === slot.date && selectedSlot?.time === slot.time;
                            return (
                                <div
                                    key={idx}
                                    className={`vertical-slot-card ${isSelected ? "active" : ""}`}
                                    onClick={() => setSelectedSlot(slot)}
                                >
                                    <div className="slot-left">
                                        <div className="slot-date">
                                            <div className="slot-date-num">{dayNum} {monthShort}</div>
                                        </div>
                                        <div className="slot-instructor">{slot.instructor}</div>
                                    </div>
                                    <div className="slot-time-right">
                                        <div className="slot-time-text">{slot.time}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="btn-red w-100 mt-5" disabled={!selectedSlot} onClick={handleBook}>Записаться</button>
                </div>
            </div>
        </>
    );
}

export default Hiit