import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';

export default function Signup({ onSignup }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Validation helpers
  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isPasswordStrong = (pwd) => {
    // At least 1 lowercase, 1 uppercase, 1 number, 1 symbol, min 8 chars
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // All fields required
    if (!firstname.trim() || !lastname.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!isEmailValid(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isPasswordStrong(password)) {
      setError('Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and symbol.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password
        })
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Signup failed');
      }
      setSuccess(true);
      if (onSignup) onSignup();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form onSubmit={handleSubmit} className="w-100" style={{maxWidth: 400}}>
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h2 className="card-title mb-4 text-center">Sign Up</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Signup successful! You can now log in.</div>}
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">First Name</label>
              <input
                id="firstname"
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Last Name</label>
              <input
                id="lastname"
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            <p className="mt-3 text-center mb-0">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
}
