import WeatherForecast from './WeatherForecast';
import Users from './Users';
import Login from './auth/Login';
import Signup from './auth/Signup';
import MyProfile from './auth/MyProfile';
import { isLoggedIn, logout } from './auth/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import './App.css';

function AppContent() {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [showLogin, setShowLogin] = useState(true);
    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        setShowLogin(true);
        window.location.href = '/'; // force redirect to login/home
    };
    return (
        <>
            <nav style={{ marginBottom: 20 }} className="d-flex justify-content-between align-items-center">
                <div>
                    <Link to="/weather" style={{ marginRight: 10 }}>Weather Forecast</Link>
                    <Link to="/users">Users</Link>
                </div>
                <div className="d-flex align-items-center gap-2">
                    {loggedIn && <MyProfile onLogout={handleLogout} />}
                </div>
            </nav>
            <Routes>
                <Route path="/" element={
                    loggedIn ? (
                        <Home />
                    ) : (
                        showLogin ? (
                            <div>
                                <Login onLogin={() => { setLoggedIn(true); setShowLogin(true); }} />
                            </div>
                        ) : (
                            <Signup onSignup={() => setShowLogin(true)} />
                        )
                    )
                } />
                <Route path="/weather" element={<WeatherForecast />} />
                <Route path="/users" element={<Users />} />
                <Route path="/login" element={<Login onLogin={() => { setLoggedIn(true); setShowLogin(true); }} />} />
                <Route path="/signup" element={<Signup onSignup={() => setShowLogin(true)} />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;