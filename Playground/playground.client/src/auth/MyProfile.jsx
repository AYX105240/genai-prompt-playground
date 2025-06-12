import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="user-profile bg-white rounded shadow-sm p-3" style={{ minWidth: 220 }}>
      <div className="user-details text-center mb-3">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      {user.role === 'Admin' && (
        <button
          onClick={() => navigate('/usermanagement')}
          className="btn btn-outline-primary btn-sm w-100 mb-2"
          style={{ borderRadius: 20, padding: '6px 14px', fontWeight: 500 }}
          title="User Management"
        >
          <i className="bi bi-people-fill me-1"></i>User Management
        </button>
      )}
      <button
        onClick={onLogout}
        className="btn btn-outline-danger btn-sm w-100"
        style={{ borderRadius: 20, padding: '6px 14px', fontWeight: 500 }}
        title="Logout"
      >
        <i className="bi bi-box-arrow-right me-1"></i>Logout
      </button>
    </div>
  );
}
