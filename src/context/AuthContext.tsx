import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // 🔥 リロード時にログイン状態復元
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost/api/user", {
          credentials: "include",
        });

        // if (!res.ok) {
        //   setUser(null);
        //   return;
        // }
        if (res.status === 401) {
          setUser(null);
          return;
        }

        if (!res.ok) {
          throw new Error("Server error");
        }

        const data = await res.json();
        setUser(data);
        
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
