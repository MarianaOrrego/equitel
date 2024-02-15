import { useState } from "react";
import { login } from "../api/login";
import "../components/styles/login.css";

const Login = ({ onLoginSuccess }: { onLoginSuccess: (user: any) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await login.findUser({ username, password });
      console.log(response.data.user.id)

      if (response.status === 200) {
        const user = response.data.user;
        localStorage.setItem("userId", user.id);
        onLoginSuccess(user);
      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
    }
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
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
