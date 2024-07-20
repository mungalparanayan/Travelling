import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false);

    const navigate = useNavigate();
    const [logoutClicked, setLogoutClicked] = useState(false);

    // Refs for detecting clicks outside of the search bar and profile options
    const profileRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleTimeLogout = () => {
            console.log('Logging out due to inactivity...');
            localStorage.removeItem('token');
            navigate('/login');
        };

        const timeoutId = setTimeout(handleTimeLogout, 3 * 60 * 60 * 1000); // 3 hours

        return () => {
            clearTimeout(timeoutId);
        };
    }, [navigate]);

    useEffect(() => {
        if (logoutClicked) {
            window.location.reload();
        }
    }, [logoutClicked]);

    useEffect(() => {
        // Handle clicks outside the profile options and search bar
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileOptions(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Email');
        setLogoutClicked(true);
        setIsLoggedIn(false);
        setShowProfileOptions(false);
        navigate("/login");
    };

    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    return (
        <div>
            <header>
                {/* Menu Toggle */}
                <div id="menu-bar" className={`fas fa-bars ${isMenuActive ? 'fa-times' : ''}`} onClick={() => setIsMenuActive(!isMenuActive)}></div>

                <a href="#" className="logo"><span>T</span>ravel</a>

                {/* Navigation Menu */}
                <nav className={`navbar ${isMenuActive ? 'active' : ''}`}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Book</Link>
                    <Link to="/history">History</Link>
                    <Link to="/rating">Review</Link>
                </nav>

                {/* Icons */}
                <div className="icons">
                    <i className="fas fa-search" id="search-btn" onClick={() => setIsSearchActive(!isSearchActive)}></i>
                    <i className="fas fa-user" id="login-btn" onClick={toggleProfileOptions} ref={profileRef}></i>
                </div>

                {/* Search Bar */}
                <form action="" className={`search-bar-container ${isSearchActive ? 'active' : ''}`} ref={searchRef}>
                    <input type="search" id="search-bar" placeholder="Search here..." />
                    <label htmlFor="search-bar" className="fas fa-search"></label>
                </form>

                {/* Profile Options */}
                {showProfileOptions && (
                    <div className="profile-options" ref={profileRef}>
                        {!isLoggedIn ? (
                            <ul className="logbut">
                                <li className="lee"><Link className="btn2" to="/login" role="button">Login</Link></li>
                                <li className="lee"><Link className="btn2" to="/signup" role="button">Signup</Link></li>
                            </ul>
                        ) : (
                            <div className="logid">
                                <span className="spn" style={{ color: "Yellowgreen" }}>{localStorage.getItem('Email')}</span>
                                <button onClick={handleLogout} className="btn1" style={{ fontSize: "2rem" }}>
                                    <span>Logout</span>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </header>
        </div>
    );
}
