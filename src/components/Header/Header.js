import React from "react";
import { Link, Outlet } from "react-router-dom";
import './Header.css'
import logoHeader from '../../images/icon_logo.svg'
import Navigation from "../Navigation/Navigation";


function Header(props) {
 const { loggedIn, onBurgerMenu } = props

    return (
      <header className="header">
      <Link to='/'>
      <img src={logoHeader} alt="логотип" className="header__logo"/>
      </Link>
      <Navigation loggedIn={loggedIn} onBurgerMenu={onBurgerMenu} />
      <Outlet />
      </header>
    );
  }
  
  export default Header;