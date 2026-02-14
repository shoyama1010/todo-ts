
// import { useState } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  // ✅ user が変わったら遷移
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/items");
      }
    }
  }, [user, navigate]);

  // if (email === "admin@test.com") {
  //   navigate("/admin");
  // } else {
  //   // navigate("/users");
  //   navigate("/items"); //
  // }

  return (
      <div className="login-container">
    <div className="card">
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
  </div>
  );
};
