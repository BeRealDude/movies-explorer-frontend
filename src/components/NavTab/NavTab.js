import './NavTab.css'
import { Link } from "react-router-dom";

function NavTab() {
    return (
      <nav className="nav">
      <Link className='nav__link' to='#project'>О проекте</Link>
      <Link className='nav__link' to='#techs'>Технологии</Link>
      <Link className='nav__link' to='#aboutMe'>Студент</Link>
      </nav>
    );
  }
  
  export default NavTab;