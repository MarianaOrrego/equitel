import { useEffect, useState } from "react";
import "../styles/users.css";
import { users } from "../../api/users";

interface User {
  id: number;
  username: string;
  rolId: number;
}

const Users = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      
      await users.createUser({ username: user, password, rolId: parseInt(role) });
      
      const response = await users.getAll();
      setAllUsers(response.data);

      setUser("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    users
      .getAll()
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [allUsers]);

  return (
    <>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.rolId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
              <option value="1">Administrador</option>
              <option value="2">Vendedor</option>
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
