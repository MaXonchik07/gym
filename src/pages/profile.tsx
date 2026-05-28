import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Profile() {
  const { user, bookings, cancelBooking, updateUserProfile } = useAuth();
  const bookingsArray = Array.isArray(bookings) ? bookings : [];
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [editError, setEditError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const getMembershipBadgeClass = (type: string) => {
    switch (type) {
      case "Basic": return "badge badge-basic";
      case "Premium": return "badge badge-premium";
      case "Elite": return "badge badge-elite";
      default: return "badge badge-basic";
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCancelBooking = (id: string, className: string, e: React.MouseEvent) => {
    e.stopPropagation();
    cancelBooking(id);
    showNotification(`Запись на ${className} отменена`);
  };

  const daysWithUs = (() => {
    if (!user.joinDate) return 0;
    const join = new Date(user.joinDate);
    if (isNaN(join.getTime())) return 0;
    return Math.floor((new Date().getTime() - join.getTime()) / (1000 * 60 * 60 * 24));
  })();

  const sortedBookings = [...bookingsArray].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const upcomingBookings = sortedBookings.filter(
    (b) => new Date(b.date) >= new Date()
  );
  const pastBookings = sortedBookings.filter(
    (b) => new Date(b.date) < new Date()
  );

  const startEditing = () => {
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
    });
    setEditError("");
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (!editForm.firstName.trim() || !editForm.lastName.trim() || !editForm.email.trim() || !editForm.phone.trim()) {
      setEditError("Все поля обязательны для заполнения");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email.trim())) {
      setEditError("Некорректный email");
      return;
    }

    const result = await updateUserProfile({
      firstName: editForm.firstName.trim(),
      lastName: editForm.lastName.trim(),
      email: editForm.email.trim(),
      phone: editForm.phone.trim(),
    });

    if (result.success) {
      showNotification("Профиль обновлён");
      setIsEditing(false);
    } else {
      setEditError(result.error || "Ошибка обновления");
    }
  };

  return (
    <>
      {notification && <div className="custom-toast">{notification}</div>}
      <div className="profile-header">
        <div className="profile-header-content">
          <h1 className="profile-header-title">
            Привет, {isEditing ? "..." : user.firstName ?? "Гость"}!
          </h1>
          <p className="profile-header-subtitle">
            Добро пожаловать в ваш личный кабинет
          </p>
        </div>
      </div>
      <div className="profile-container mx-0">
        <div className="row gap-5 mx-0">
          <div className="col-4 p-0">
            <div className="profile-card">
              <div className="profile-card-title">Информация о профиле</div>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="avatar-circle">
                  <span>
                    {user.firstName?.[0] ?? ""}
                    {user.lastName?.[0] ?? ""}
                  </span>
                </div>
                {!isEditing && (
                  <div>
                    <p className="fw-bold mb-1">
                      {user.firstName ?? ""} {user.lastName ?? ""}
                    </p>
                    <span className={getMembershipBadgeClass(user.membershipType)}>
                      {user.membershipType}
                    </span>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="edit-form">
                  {editError && <div className="edit-error">{editError}</div>}
                  <div className="form-group">
                    <label className="form-label">Имя</label>
                    <input
                      className="form-input"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Фамилия</label>
                    <input
                      className="form-input"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Почта</label>
                    <input
                      className="form-input"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Телефон</label>
                    <input
                      className="form-input"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn-outline-red flex-fill" onClick={() => setIsEditing(false)}>
                      Отмена
                    </button>
                    <button className="btn-red flex-fill" onClick={handleSaveProfile}>
                      Сохранить
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="icon-emoji">✉️</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="icon-emoji">📞</span>
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <button className="btn-outline-red" onClick={startEditing}>
                      Редактировать профиль
                    </button>
                    <button className="btn-outline-red" onClick={() => navigate("/prices")}>
                      Изменить план
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-lg p-0">
            <div className="profile-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="profile-card-title mb-0">Предстоящие занятия</h2>
                <button
                  className="butt-red d-flex align-items-center gap-2"
                  onClick={() => navigate("/classes")}
                >
                  Записаться
                </button>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="text-center py-5">
                  <span style={{ fontSize: "48px" }}>📅</span>
                  <p className="text-secondary mb-3">У вас нет предстоящих занятий</p>
                  <button className="btn-outline-red" onClick={() => navigate("/classes")}>
                    Посмотреть расписание
                  </button>
                </div>
              ) : (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="booking-item upcoming"
                    onClick={() => navigate(`/classes/${booking.classId}`)}
                  >
                    <div className="booking-date-box">
                      <span className="booking-month">
                        {new Date(booking.date).toLocaleDateString("ru-RU", {
                          month: "short",
                        })}
                      </span>
                      <span className="booking-day">
                        {new Date(booking.date).getDate()}
                      </span>
                    </div>
                    <div className="booking-details">
                      <h3 className="booking-class-name">{booking.className}</h3>
                      <div className="d-flex gap-3 text-secondary small">
                        <span className="d-flex align-items-center gap-1">
                          <span className="icon-emoji">🕐</span> {booking.time}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <span className="icon-emoji">👤</span> {booking.instructor}
                        </span>
                      </div>
                    </div>
                    <button
                      className="booking-cancel-btn"
                      onClick={(e) => handleCancelBooking(booking.id, booking.className, e)}
                    >
                      <span className="icon-emoji">✖</span>
                      Отменить
                    </button>
                  </div>
                ))
              )}
            </div>

            {pastBookings.length > 0 && (
              <div className="profile-card">
                <h2 className="profile-card-title mb-4">История занятий</h2>
                {pastBookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="booking-item past">
                    <div className="booking-date-box past-date-box">
                      <span className="booking-month">
                        {new Date(booking.date).toLocaleDateString("ru-RU", {
                          month: "short",
                        })}
                      </span>
                      <span className="booking-day">
                        {new Date(booking.date).getDate()}
                      </span>
                    </div>
                    <div className="booking-details">
                      <h3 className="booking-class-name">{booking.className}</h3>
                      <div className="d-flex gap-3 text-secondary small">
                        <span className="d-flex align-items-center gap-1">
                          <span className="icon-emoji">🕐</span> {booking.time}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <span className="icon-emoji">👤</span> {booking.instructor}
                        </span>
                      </div>
                    </div>
                    <span className="badge badge-completed">Завершено</span>
                  </div>
                ))}
              </div>
            )}

            <div className="profile-card">
              <h2 className="profile-card-title mb-4">Статистика</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{bookingsArray.length}</span>
                  <span className="stat-label">Всего записей</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{daysWithUs}</span>
                  <span className="stat-label">Дней с нами</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{bookingsArray.length * 60}</span>
                  <span className="stat-label">Минут тренировок</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile