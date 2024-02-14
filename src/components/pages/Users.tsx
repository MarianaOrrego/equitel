import { useState } from "react";
import "../styles/users.css";

const Users = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // addUser({ user, password, role });
    setUser("");
    setPassword("");
    setRole("");
  };

  return (
    <>
      <div className="container-users">
        <form className="form-container-users" onSubmit={handleSubmit}>
          <div className="input-group-users">
            <label htmlFor="user">Usuario:</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="input-group-users">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Seleccionar Rol</option>
              <option value="admin">Admin</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <button type="submit" className="button">
            Agregar Usuario
          </button>
        </form>
      </div>
    </>
  );
};

export default Users;
