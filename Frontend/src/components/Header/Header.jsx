import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="padding-2 over-slider">
      <Link to="/">
        <img src="./img/logo.svg" width="160" height="50" alt="Grilli Logo" />
      </Link>
      <div className="nav__items">
        <Link to="/" className="nav-items--active">
          Home
        </Link>
        <a href="#menu">Menus</a>
        <a href="#about">About Us</a>
        <a href="#chefs">Our Chefs</a>
        <a href="#contact">Contact</a>
        <Link to="/cart" className="cart-area">
          Cart
          {cart.totalCount > 0 && (
            <span className="count-display">{cart.totalCount}</span>
          )}
        </Link>
      </div>
      <div className="nav-right">
        {/* {user ? ( */}
        <div className="user-menu">
            <button onClick={toggleDropdown}>
              <svg className="user-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="9" r="3" stroke="#fff" strokeWidth="1.5"></circle> <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.5"></circle> <path opacity="0.5" d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/orders" className="dropdown-item">
                  Orders
                </Link>
                <button className="dropdown-item" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        {/* // ) : ( */}
          {/* <Link to="/login" className="btn btn-secondary btn-login">
            <span>Login</span>
          </Link> */}
        {/* // )} */}
        <div className="aside-open">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
