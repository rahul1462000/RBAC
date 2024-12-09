import React, { useState, useEffect } from "react";
import axios from "axios";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState("");

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/permissions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPermissions(response.data);
  };

  const addPermission = async () => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/permissions", { name: newPermission }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewPermission("");
    fetchPermissions();
  };

  const deletePermission = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/permissions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPermissions();
  };

  return (
    <div className="container mt-5">
      <h2>Permission Management</h2>
      <form onSubmit={(e) => { e.preventDefault(); addPermission(); }}>
        <input
          type="text"
          placeholder="Permission Name"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          required
        />
        <button type="submit">Add Permission</button>
      </form>
      <ul>
        {permissions.map((permission) => (
          <li key={permission._id}>
            {permission.name}
            <button onClick={() => deletePermission(permission._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionManagement;
