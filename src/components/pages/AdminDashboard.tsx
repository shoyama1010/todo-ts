import { UserList } from "./UserList";
import { useAuth } from "../../context/AuthContext";

export const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>管理者ページ</h2>
      <button onClick={logout}>ログアウト</button>
      <UserList />
    </div>
  );
};
