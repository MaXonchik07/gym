import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: "Basic" | "Premium" | "Elite";
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

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  // Синхронизация с localStorage
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

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const addBooking = (booking: Omit<Booking, "id">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateMembership = async (planName: string) => {
    if (!user) return;
    const updatedUser = { ...user, membershipType: planName as User["membershipType"] };
    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const updateUserProfile = async (
    updatedFields: Partial<User>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "Пользователь не авторизован" };

    const newEmail = updatedFields.email?.trim().toLowerCase();
    const newPhone = updatedFields.phone?.trim();

    if (newEmail) {
      const emailTaken = users.some(
        (u) => u.id !== user.id && u.email.toLowerCase() === newEmail
      );
      if (emailTaken) {
        return { success: false, error: "Этот email уже используется другим пользователем" };
      }
    }

    if (newPhone) {
      const phoneTaken = users.some(
        (u) => u.id !== user.id && u.phone === newPhone
      );
      if (phoneTaken) {
        return { success: false, error: "Этот номер телефона уже используется другим пользователем" };
      }
    }

    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    return { success: true };
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