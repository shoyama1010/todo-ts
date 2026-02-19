import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // CSRF取得
      await fetch("http://localhost/sanctum/csrf-cookie", {
        credentials: "include",
      });

      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };

      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch("http://localhost/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "登録失敗");
      }

      alert("登録成功！ログインしてください");
      navigate("/");
    } catch (error) {
      alert("登録失敗");
    }
  };

  return (
    <div className='login-container'>
      <div className='card'>
        <h2>新規登録</h2>

        <input
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleRegister}>登録</button>
      </div>
    </div>
  );
};
