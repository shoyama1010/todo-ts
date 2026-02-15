import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null; // ログインしてない時は非表示

  return (
    <header className='header'>
      <h1 className='logo'>Mogitate</h1>

      <div className='header-right'>
        <span className='user-name'>{user.name}</span>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </header>
  );
};
