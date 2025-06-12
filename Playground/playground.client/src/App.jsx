import WeatherForecast from './WeatherForecast';
import Users from './Users';
import Login from './auth/Login';
import Signup from './auth/Signup';
import MyProfile from './auth/MyProfile';
import { isLoggedIn, logout, getUser } from './auth/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import Schedules from './Schedules';
import Cart from './cart/Cart';
import WishList from './wishlist/WishList';
import Catalog from './catalog/Catalog';
import UserManagement from './usermanagement/UserManagement'; // Import UserManagement
import NavigationBar from './NavigationBar';
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
    const isAdmin = getUser()?.role === 'Admin'; // Replace with actual admin check logic
    return (
        <>
            <NavigationBar loggedIn={loggedIn} onLogout={handleLogout} />
            <div className="col-sm-12">
                <Routes>
                    <Route path="/" element={<Catalog />} />
                    <Route path="/weather" element={<WeatherForecast />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<WishList />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/login" element={<Login onLogin={() => { setLoggedIn(true); setShowLogin(true); }} />} />
                    <Route path="/signup" element={<Signup onSignup={() => setShowLogin(true)} />} />
                    <Route path="/usermanagement" element={<UserManagement />} /> {/* Add route for UserManagement */}
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