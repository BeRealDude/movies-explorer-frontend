import React from "react";
import { Link, Outlet } from "react-router-dom";
import './Header.css'
import logoHeader from '../../images/icon_logo.svg'
import Navigation from "../Navigation/Navigation";


function Header({ loggedIn }) {
 

    return (
      <header className="header">
      <Link to='/'>
      <img src={logoHeader} alt="логотип" className="header__logo"/>
      </Link>
      <Navigation loggedIn={loggedIn} />
      <Outlet />
      </header>
    );
  }
  
  export default Header;