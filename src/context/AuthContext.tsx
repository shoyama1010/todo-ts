/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // 仮ログイン
    if (email === "admin@test.com") {
      setUser({
        id: 1,
        name: "Admin",
        email,
        role: "admin",
      });
    } else {
      setUser({
        id: 2,
        name: "User",
        email,
        role: "user",
      });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
