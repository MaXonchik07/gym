import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: "Базовый" | "Премиум" | "Элитный";
  role?: "user" | "admin";
}

export interface Booking {
  id: string;
  classId: string;
  className: string;
  instructor: string;
  date: string;
  time: string;
}

interface AuthContextType {
  user: User | null;
  bookings: Booking[];
  users: User[];
  login: (userData: User) => void;
  logout: () => void;
  cancelBooking: (id: string) => void;
  addBooking: (booking: Omit<Booking, "id">) => void;
  updateMembership: (planName: string) => Promise<void>;
  updateUserProfile: (updatedFields: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  fetchBookings: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = (userData: User) => {
    setUsers((prev) => {
      const exists = prev.find((u) => u.id === userData.id);
      if (!exists) {
        return [...prev, userData];
      }
      return prev;
    });
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
  };

  const cancelBooking = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8081/api/bookings/cancel?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        console.error("Не удалось отменить бронь на сервере");
      }
    } catch (err) {
      console.error("Ошибка сети при отмене", err);
    }
  };

  const addBooking = (booking: Omit<Booking, "id">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateMembership = async (planName: string) => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;
    try {
      const res = await fetch("http://localhost:8080/api/auth/membership", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ membership_type: planName }),
      });
      if (res.ok) {
        await refreshUser();
      } else {
        throw new Error("Не удалось обновить тариф");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserProfile = async (updatedFields: Partial<User>) => {
    const token = localStorage.getItem("token");
    if (!token || !user) return { success: false, error: "Нет токена" };
    try {
      const res = await fetch("http://localhost:8080/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: updatedFields.firstName,
          last_name: updatedFields.lastName,
          email: updatedFields.email,
          phone: updatedFields.phone,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text || "Ошибка обновления" };
      }
      const rawUser = await res.json();
      const updatedUser = {
        id: rawUser.id,
        firstName: rawUser.first_name,
        lastName: rawUser.last_name,
        email: rawUser.email,
        phone: rawUser.phone,
        membershipType: rawUser.membership_type,
        role: rawUser.role || "user",
        joinDate: rawUser.join_date,
      };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8081/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const normalized = data.map((b: any) => ({
            id: b.id,
            classId: b.class_id,
            className: b.class_name,
            instructor: b.instructor,
            date: b.date,
            time: b.time,
          }));
          setBookings(normalized);
        } else {
          setBookings([]);
        }
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setBookings([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const rawUser = await res.json();
        const updatedUser = {
          id: rawUser.id,
          firstName: rawUser.first_name,
          lastName: rawUser.last_name,
          email: rawUser.email,
          phone: rawUser.phone,
          membershipType: rawUser.membership_type,
          role: rawUser.role || "user",
          joinDate: rawUser.join_date,
        };
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Не удалось обновить пользователя", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookings,
        users,
        login,
        logout,
        cancelBooking,
        addBooking,
        updateMembership,
        updateUserProfile,
        fetchBookings,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}