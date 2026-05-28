import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../AuthContext";

export default function YogaDetail() {
  const navigate = useNavigate();
  const { user, bookings, addBooking } = useAuth();
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
    instructor: string;
  } | null>(null);

  const classData = {
    id: "yoga",
    name: "Yoga Flow",
    description:
      "Динамическая последовательность поз для развития силы, гибкости и осознанности. Подходит для всех уровней подготовки.",
    image:
      "https://images.unsplash.com/photo-1651077837628-52b3247550ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY2xhc3MlMjBzdHVkaW98ZW58MXx8fHwxNzc0MzcxNjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    duration: "60 мин",
    capacity: "3",
    difficulty: "Beginner",
    schedule: [
      { day: "Понедельник", time: "07:00", instructor: "Анна Иванова" },
      { day: "Среда", time: "18:00", instructor: "Анна Иванова" },
      { day: "Пятница", time: "07:00", instructor: "Елена Смирнова" },
    ],
    instructor: "Анна Иванова",
    benefits: [
      "Улучшение гибкости",
      "Снижение стресса",
      "Укрепление мышц кора",
      "Улучшение баланса",
    ],
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const getDifficultyBadgeClass = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "badge badge-beginner";
      case "Intermediate": return "badge badge-intermediate";
      case "Advanced": return "badge badge-advanced";
      default: return "badge badge-all";
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
      instructor: selectedSlot.instructor,
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

    } catch (error) {
      console.error("Booking error", error);
      showNotification("Ошибка сети при записи");
    }
  };

  return (
    <>
      {notification && <div className="custom-toast">{notification}</div>}

      <div className="class-hero" style={{ backgroundImage: `url('${classData.image}')` }}>
        <div className="class-hero-overlay yogaIMG">
          <div className="class-hero-content">
            <button className="btn-back" onClick={() => navigate("/classes")}>
              ← Назад к занятиям
            </button>
            <h1 className="class-hero-title">{classData.name}</h1>
            <div className="class-hero-badges">
              <span className={getDifficultyBadgeClass(classData.difficulty)}>
                {classData.difficulty}
              </span>
              <span className="badge badge-secondary">{classData.duration}</span>
              <span className="badge badge-secondary">До {classData.capacity} чел.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="class-container">
        <div className="row gap-5 mx-0">
          <div className="col-lg-8">
            <div className="profile-card">
              <h2 className="profile-card-title">Описание занятия</h2>
              <p className="class-description">{classData.description}</p>
            </div>
            <div className="profile-card">
              <h2 className="profile-card-title">Что вы получите</h2>
              <div className="benefits-grid">
                {classData.benefits.map((b, idx) => (
                  <div key={idx} className="benefit-item">
                    <span className="benefit-icon">🏆</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg">
            <div className="profile-card">
              <h2 className="profile-card-title">О занятии</h2>
              <div className="sidebar-info">
                <div className="info-item-sidebar">
                  <span className="icon-emoji">🕐</span>
                  <span>Длительность: {classData.duration}</span>
                </div>
                <div className="info-item-sidebar">
                  <span className="icon-emoji">👥</span>
                  <span>Макс. {classData.capacity} чел.</span>
                </div>
                <div className="info-item-sidebar">
                  <span className="icon-emoji">📈</span>
                  <span>Уровень: {classData.difficulty}</span>
                </div>
              </div>
              <div className="sidebar-rules">
                <p className="fw-bold mb-2">Важно:</p>
                <ul>
                  <li>Приходите за 10 минут до начала</li>
                  <li>Возьмите воду и полотенце</li>
                  <li>Отмена возможна за 24 часа</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-card mt-4" id="slots-section">
          <h2 className="profile-card-title">Ближайшие занятия</h2>
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
                      <span className="slot-date-num">{dayNum} {monthShort}</span>
                    </div>
                    <div className="slot-instructor">{slot.instructor}</div>
                  </div>
                  <div className="slot-time-right">
                    <span className="slot-time-text">{slot.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn-red w-100 mt-3" disabled={!selectedSlot} onClick={handleBook}>Записаться</button>
        </div>
      </div>
    </>
  );
}