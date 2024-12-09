import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/users">User Management</Link></li>
        <li><Link to="/roles">Role Management</Link></li>
        <li><Link to="/permissions">Permission Management</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
