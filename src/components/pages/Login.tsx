import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // ① CSRF取得
      await fetch("http://localhost/sanctum/csrf-cookie", {
        credentials: "include",
      });

      // ② CookieからXSRF取得
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop()?.split(";").shift();
        }
      };

      const xsrfToken = getCookie("XSRF-TOKEN");

      // ③ ログイン
      const res = await fetch("http://localhost/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ④ ログインユーザー取得
      const userRes = await fetch("http://localhost/api/user", {
        credentials: "include",
      });

      const user = await userRes.json();

      // 🔥 Contextへ保存
      setUser(user);

      alert("ログイン成功！");
      navigate("/items");
    } catch (error) {
      console.error(error);
      alert("ログイン失敗");
    }
  };

  return (
    <div className='login-container'>
      <div className='card'>
        <h2>ログイン</h2>

        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>ログイン</button>
      </div>
      <p>
        アカウントをお持ちでない方は
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          新規登録
        </span>
      </p>
    </div>
  );
};
