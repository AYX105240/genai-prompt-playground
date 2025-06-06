import React from 'react';

export default function MyProfile({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;
  return (
    <div className="d-flex align-items-center bg-white rounded shadow-sm px-3 py-1" style={{ minWidth: 220 }}>
      <div className="me-2 d-flex flex-column text-end">
        <span className="fw-semibold" style={{ fontSize: '1.05em' }}>{user.firstName} {user.lastName}</span>
       <br/>
        <span className="text-muted" style={{ fontSize: '0.92em', lineHeight: 1 }}>{user.email}</span>
      </div>
      <button
        onClick={onLogout}
        className="btn btn-outline-danger btn-sm ms-2"
        style={{ borderRadius: 20, padding: '2px 14px', fontWeight: 500 }}
        title="Logout"
      >
        <i className="bi bi-box-arrow-right me-1"></i>Logout
      </button>
    </div>
  );
}
