import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
// import classes from './header.module.css';
import "./Header.css"

export default function Header2() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          FoodHunt By BR Tech
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Logout</a>
                  {/* Use a button for logout to enhance accessibility and semantics
                  <button className={classes.logout_button} onClick={logout}>
                    Logout
                  </button> */}
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}


export default function Header () {
  return(
    <nav class="padding-2 over-slider">
          <img src="./img/logo.svg" width="160" height="50" alt="Grilli Logo" />
          <div class="nav__items">
              <a href="#home" class="nav-items--active">Home</a>
              <a href="#menu">Menus</a>
              <a href="#about">About Us</a>
              <a href="#chefs">Our Chefs</a>
              <a href="#contact">Contact</a>
          </div>
          <div class="nav-right">
              <button class="btn btn-secondary" data-text="Come on!">
                  <span>Find a table</span>
              </button>
              <div class="aside-open">
                  <span></span><span></span><span></span>
              </div>
          </div>
      </nav>
  )
}
