import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';
import MyProfile from './auth/MyProfile';

function NavigationBar({ loggedIn, onLogout }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleProfileClick = () => {
        if (!loggedIn) {
            alert('Please login to access your profile.');
            window.location.href = '/login';
        } else {
            setShowDropdown(!showDropdown);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/catalog" className="navbar-logo">Catalog</Link>
            </div>
            <div className="navbar-right">
                <Link to="/wishlist" className="navbar-link">
                    <FontAwesomeIcon icon={faHeart} /> Wishlist
                </Link>
                <Link to="/cart" className="navbar-link">
                    <FontAwesomeIcon icon={faShoppingCart} /> Cart
                </Link>
                <div className="navbar-profile" onClick={handleProfileClick}>
                    <span className="profile-name">
                        <FontAwesomeIcon icon={faUserCircle} /> My Profile
                    </span>
                    {loggedIn && showDropdown && (
                        <div className="profile-dropdown">
                            <Link to="/my-profile" className="dropdown-link">View Profile</Link>
                            <button onClick={onLogout} className="dropdown-link">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
