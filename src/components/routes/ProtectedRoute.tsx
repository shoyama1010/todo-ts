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

  if (!user) {
    return <Navigate to='/'  />;
  }

  if (role && user.role !== role) {
    return <Navigate to='/items' />;
  }

  return <>{children}</>;
};
