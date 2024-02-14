import { useEffect, useState } from "react";
import "../styles/users.css";
import { users } from "../../api/users";
import { rol } from "../../api/rol";

interface User {
  id: number;
  username: string;
  password: string;
  rolId: number;
}
interface Rol {
  id: number;
  name: string;
}

const Users = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allRoles, setAllRoles] = useState<Rol[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await users.getAllUsers();
        setAllUsers(usersResponse.data);
        const rolesResponse = await rol.getAllRol();
        setAllRoles(rolesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setUser(user.username);
    setPassword(user.password);
    setRoleId(user.rolId.toString());
    setIsEditMode(true);
  };

  const handleAddOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedUser) {
        await users.updateUser(selectedUser.id, {
          username: user,
          password: password,
          rolId: parseInt(roleId),
        });
        setIsEditMode(false);
      } else {
        await users.createUser({
          username: user,
          password,
          rolId: parseInt(roleId),
        });
      }
      const response = await users.getAllUsers();
      setAllUsers(response.data);
      setUser("");
      setPassword("");
      setRoleId("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?",
    );
    if (confirmDelete) {
      try {
        await users.deleteUser(userId);
        const updatedUsers = allUsers.filter((user) => user.id !== userId);
        setAllUsers(updatedUsers);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{allRoles.find((role) => role.id === user.rolId)?.name}</td>
                <td>
                  <button className="button" onClick={() => handleEdit(user)}>
                    Editar
                  </button>
                  <button
                    className="button delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container-users">
        <form className="form-container-users" onSubmit={handleAddOrUpdate}>
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
              required={!isEditMode}
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Rol a desempeñar:</label>
            <select
              id="role"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              <option value="">Seleccionar Rol</option>
              {allRoles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button">
            {isEditMode ? "Guardar Cambios" : "Agregar Usuario"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Users;
