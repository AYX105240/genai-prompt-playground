import WeatherForecast from './WeatherForecast';
import Users from './Users';
import Login from './auth/Login';
import Signup from './auth/Signup';
import MyProfile from './auth/MyProfile';
import { isLoggedIn, logout } from './auth/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import Schedules from './Schedules';
import Cart from './cart/Cart';
import WishList from './wishlist/WishList';
import Catalog from './catalog/Catalog';
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
            <div className="col-sm-12">
                <div className="float-lg-end" style={{ zIndex: 1050 }}>
                    {loggedIn && <MyProfile onLogout={handleLogout} />}
                </div>
                <nav style={{ marginBottom: 20 }} className="d-flex justify-content-between align-items-center">
                    <div>
                        {loggedIn && (
                            <>
                                <Link to="/weather" style={{ marginRight: 10 }}>Weather Forecast</Link>
                                <Link to="/users" style={{ marginRight: 10 }}>Users</Link>
                                <Link to="/schedules" style={{ marginRight: 10 }}>Schedules</Link>
                                <Link to="/cart" style={{ marginRight: 10 }}>Cart</Link>
                                <Link to="/wishlist" style={{ marginRight: 10 }}>WishList</Link>
                                <Link to="/catalog">Catalog</Link>
                            </>
                        )}
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
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<WishList />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/login" element={<Login onLogin={() => { setLoggedIn(true); setShowLogin(true); }} />} />
                    <Route path="/signup" element={<Signup onSignup={() => setShowLogin(true)} />} />
                </Routes>
            </div>
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