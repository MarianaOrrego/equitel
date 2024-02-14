import React, { useState } from "react";
import "../components/styles/login.css";
// interface LoginProps {
//   onLogin: (username: string, password: string) => void;
// }

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <form className="form-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
