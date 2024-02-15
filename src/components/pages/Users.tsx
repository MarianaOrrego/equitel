import { useUsers } from "../../hooks/useUser";

import "../styles/users.css";

const Users = () => {
  const {
    user,
    setUser,
    password,
    setPassword,
    roleId,
    setRoleId,
    allUsers,
    allRoles,
    isEditMode,
    handleEdit,
    handleAddOrUpdate,
    handleDelete,
  } = useUsers();

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
