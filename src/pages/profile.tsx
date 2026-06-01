import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Chat from "./chat";

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
  const [adminChatUsers, setAdminChatUsers] = useState<{ user_id: string; first_name: string; last_name: string }[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<{ userId: string; firstName: string; lastName: string } | null>(null);

  const classDurations: Record<string, number> = {
    yoga: 45,
    strength: 60,
    spin: 45,
    boxing: 60,
    hiit: 45,
  };

  useEffect(() => {
    if (user?.role === "admin") {
      const token = localStorage.getItem("token");
      if (!token) return;
      fetch("http://localhost:8081/api/admin/chat-users-with-names", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((u: any) => u.user_id !== user.id);
          setAdminChatUsers(filtered);
        })
        .catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const getMembershipBadgeClass = (type: string) => {
    switch (type) {
      case "Базовый": return "badge badge-basic";
      case "Премиум": return "badge badge-premium";
      case "Элитный": return "badge badge-elite";
    }
  };

  const totalMinutes = bookingsArray.reduce((total, booking) => {
    const duration = classDurations[booking.classId] || 60;
    return total + duration;
  }, 0);

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
      {notification && <div className="notificationn">{notification}</div>}
      <div className="block1prf mx-0">
        <div className="block1prfCT">
          <div className="block1prfBT">
            Привет, {isEditing ? "..." : user.firstName}!
          </div>
          <div className="block1prfT">
            Добро пожаловать в ваш личный кабинет
          </div>
        </div>
      </div>
      <div className="block2prf mx-0">
        <div className="row gap-5 mx-0 block2prfMediaAbout">
          <div className="col-4 p-0">
            <div className="profile">
              <div className="profileAbout">Информация о профиле</div>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="avatar">
                  <div>
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                </div>
                {!isEditing && (
                  <div>
                    <div className="profileName mb-1">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className={getMembershipBadgeClass(user.membershipType)}>
                      {user.membershipType}
                    </div>
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="profileChangeBlock">
                  {editError && <div className="profileChangeError">{editError}</div>}
                  <div className="profileChange">
                    <label className="profileChangeName">Имя</label>
                    <input className="profileChangeInput" value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} />
                  </div>
                  <div className="profileChange">
                    <label className="profileChangeName">Фамилия</label>
                    <input className="profileChangeInput" value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} />
                  </div>
                  <div className="profileChange">
                    <label className="profileChangeName">Почта</label>
                    <input className="profileChangeInput" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                  </div>
                  <div className="profileChange">
                    <label className="profileChangeName">Телефон</label>
                    <input className="profileChangeInput" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button className="buttRed flex-fill" onClick={() => setIsEditing(false)}>
                      Отмена
                    </button>
                    <button className="buttRed flex-fill" onClick={handleSaveProfile}>
                      Сохранить
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="profileInfo">
                    <div className="profileInfoBlock mb-2">
                      <div className="profileInfoIcon1"></div>
                      <div>{user.email}</div>
                    </div>
                    <div className="profileInfoBlock">
                      <div className="profileInfoIcon2 profileInfoIcon1"></div>
                      <div>{user.phone}</div>
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="buttRed" onClick={startEditing}>
                      Редактировать профиль
                    </button>
                    <Link to="/prices" className="p-0">
                      <button className="buttRed changePlan">
                        Изменить план
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col p-0">
            {user?.role === "admin" ? (
              <div className="profileStat">
                <h2 className="profileStatTitle">Обращения в поддержку</h2>
                {selectedChatUser ? (
                  <>
                    <button className="buttRed" onClick={() => setSelectedChatUser(null)}>
                      ← Назад к списку
                    </button>
                    <Chat recipientId={selectedChatUser.userId} recipientName={`${selectedChatUser.firstName} ${selectedChatUser.lastName}`} adminMode />
                  </>
                ) : (
                  <div className="adminChatList">
                    {adminChatUsers.length === 0 && <p>Нет обращений</p>}
                    {adminChatUsers.map((u) => (
                      <div key={u.user_id} className="adminChatUser" onClick={() => setSelectedChatUser({ userId: u.user_id, firstName: u.first_name, lastName: u.last_name })}>
                        {u.first_name} {u.last_name} (ID: {u.user_id})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="profileStat">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="profileStatTitle mb-0">Предстоящие занятия</div>
                    <Link to="/classes">
                      <button className="butt-red">Записаться</button>
                    </Link>
                  </div>
                  {upcomingBookings.length === 0 ? (
                    <div className="py-5 bookingEmpty">
                      <div className="bookingIcon"></div>
                      <div className="text-secondary mb-3">У вас нет предстоящих занятий</div>
                    </div>
                  ) : (
                    upcomingBookings.map((booking) => (
                      <div key={booking.id} className="booking bookingBefore">
                        <div className="bookingDate">
                          <div className="bookingMonth">
                            {new Date(booking.date).toLocaleDateString("ru-RU", {
                              month: "short",
                            })}
                          </div>
                          <div className="bookingDay">
                            {new Date(booking.date).getDate()}
                          </div>
                        </div>
                        <div className="bookingDetails">
                          <h3 className="bookingName">{booking.className}</h3>
                          <div className="d-flex gap-3 text-secondary small">
                            <div className="d-flex align-items-center gap-1">
                              <div className="bookingDetailIcon1"></div> {booking.time}
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <div className="bookingDetailIcon1 bookingDetailIcon2"></div> {booking.instructor}
                            </div>
                          </div>
                        </div>
                        <button className="bookingCancel" onClick={(e) => handleCancelBooking(booking.id, booking.className, e)}>
                          <div className="icon-emoji">✖</div>
                          <div>Отменить</div>
                        </button>
                      </div>
                    ))
                  )}
                </div>
                {pastBookings.length > 0 && (
                  <div className="profileStat">
                    <h2 className="profileStatTitle mb-4">История занятий</h2>
                    {pastBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="booking bookingAfter">
                        <div className="bookingDate bookingDatePast">
                          <div className="bookingMonth">
                            {new Date(booking.date).toLocaleDateString("ru-RU", {
                              month: "short",
                            })}
                          </div>
                          <div className="bookingDay">
                            {new Date(booking.date).getDate()}
                          </div>
                        </div>
                        <div className="bookingDetails">
                          <h3 className="bookingName">{booking.className}</h3>
                          <div className="d-flex gap-3 text-secondary small">
                            <div className="d-flex align-items-center gap-1">
                              <div className="bookingDetailIcon1"></div> {booking.time}
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <div className="bookingDetailIcon1 bookingDetailIcon2"></div> {booking.instructor}
                            </div>
                          </div>
                        </div>
                        <div className="badge badge-completed">Завершено</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="profileStat mb-0">
                  <h2 className="profileStatTitle mb-4">Статистика</h2>
                  <div className="statsBlock">
                    <div className="stat">
                      <div className="statNum">{bookingsArray.length}</div>
                      <div className="statText">Всего записей</div>
                    </div>
                    <div className="stat">
                      <div className="statNum">{daysWithUs}</div>
                      <div className="statText">Дней с нами</div>
                    </div>
                    <div className="stat">
                      <div className="statNum">{totalMinutes}</div>
                      <div className="statText">Минут тренировок</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;