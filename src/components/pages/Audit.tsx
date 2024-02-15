import { useState, useEffect } from "react";
import { audit } from "../../api/audit";
import { users } from "../../api/users";

import "../styles/audit.css";

interface User {
  id: number;
  username: string;
}

interface AuditEntry {
  action: string;
  createdBy: number;
  createdAt: string;
  details: string;
}

const Audit = () => {
  const [auditData, setAuditData] = useState<AuditEntry[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auditResponse = await audit.getAllAudit();
        const usersResponse = await users.getAllUsers();

        setAuditData(auditResponse.data);
        setUsersData(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getUsernameById = (userId: number) => {
    const user = usersData.find((user) => user.id === userId);
    return user ? user.username : "Unknown";
  };

  return (
    <div className="container-audit">
      <h2>Registro de Auditoría</h2>
      <div className="table-container-audit">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Acción</th>
              <th>Creado por</th>
              <th>Fecha</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {auditData.map((auditEntry, index) => (
              <tr key={index}>
                <td>{auditEntry.action}</td>
                <td>{getUsernameById(auditEntry.createdBy)}</td>
                <td>{new Date(auditEntry.createdAt).toLocaleString()}</td>
                <td>{auditEntry.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Audit;
