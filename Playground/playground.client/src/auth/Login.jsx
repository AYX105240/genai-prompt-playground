import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      // data: { user: { Id, FirstName, LastName, Email }, token }
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (onLogin) onLogin(data.user);

      const params = new URLSearchParams(window.location.search);
      const returnUrl = params.get('returnUrl');
      navigate(returnUrl || '/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="w-100" style={{maxWidth: 400}}>
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h2 className="card-title mb-4 text-center">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3 row align-items-center">
              <label htmlFor="username" className="col-sm-4 col-form-label text-end">Username</label>
              <div className="col-sm-8">
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label htmlFor="password" className="col-sm-4 col-form-label text-end">Password</label>
              <div className="col-sm-8">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <p className="mt-3 text-center mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
}
