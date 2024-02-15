import { useEffect, useState } from "react";
import { users } from "../api/users";
import { rol } from "../api/rol";

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

export const useUsers = () => {
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

  return {
    user,
    setUser,
    password,
    setPassword,
    roleId,
    setRoleId,
    allUsers,
    allRoles,
    selectedUser,
    isEditMode,
    handleEdit,
    handleAddOrUpdate,
    handleDelete,
  };
};
