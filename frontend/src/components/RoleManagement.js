import React, { useState, useEffect } from "react";
import axios from "axios";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/roles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRoles(response.data);
  };

  const fetchPermissions = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/permissions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPermissions(response.data);
  };

  const addRole = async () => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/roles", newRole, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchRoles();
  };

  const deleteRole = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRoles(); // Refresh the roles list after deletion
    } catch (err) {
      console.error(err); // Log the error for debugging
      alert("Error deleting role. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Role Management</h2>
      <form onSubmit={(e) => { e.preventDefault(); addRole(); }}>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          required
        />
        <select
          multiple
          value={newRole.permissions}
          onChange={(e) =>
            setNewRole({
              ...newRole,
              permissions: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
        >
          {permissions.map((permission) => (
            <option key={permission._id} value={permission._id}>
              {permission.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Role</button>
      </form>
      <ul>
        {roles.map((role) => (
          <li key={role._id}>
            {role.name} - Permissions: {role.permissions.join(", ")}
            <button onClick={() => deleteRole(role._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
