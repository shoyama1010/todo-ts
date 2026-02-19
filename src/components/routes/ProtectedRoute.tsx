import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import type { JSX } from "react";

type Props = {
  children: ReactNode;
  role?: "admin" | "user";
};

export const ProtectedRoute = ({ children, role }: Props) => {
  const { user } = useAuth();

  // ① 読み込み中
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // ② 未ログイン
  if (!user) {
    return <Navigate to='/' />;
  }

  // ③ ロールチェック
  if (role && user.role !== role) {
    return <Navigate to='/items' />;
  }

  return <>{children}</>;
};
