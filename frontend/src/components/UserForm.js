// /components/UserForm.js
import React, { useState, useEffect } from "react";
import { addUser, getRoles } from "../services/api";
import { useNavigate } from 'react-router-dom';


const UserForm = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRoles().then((res) => setRoles(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password, roles: selectedRoles };
    try {
      await addUser(userData);
      navigate("/users");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <h3>Roles</h3>
          {roles.map((role) => (
            <div key={role._id}>
              <input
                type="checkbox"
                value={role._id}
                onChange={(e) => {
                  const newRoles = [...selectedRoles];
                  if (e.target.checked) {
                    newRoles.push(role._id);
                  } else {
                    const index = newRoles.indexOf(role._id);
                    newRoles.splice(index, 1);
                  }
                  setSelectedRoles(newRoles);
                }}
              />
              <label>{role.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Save User</button>
      </form>
    </div>
  );
};

export default UserForm;
