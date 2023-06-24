import './Navigation.css'
import { useNavigate, useLocation } from "react-router-dom";
import iconProfile from '../../images/icon_profile.svg'

function Navigation({ loggedIn }) {
    const navigate = useNavigate();
    const location = useLocation();

    function switchPageSignup() {
      navigate("/signup", { replace: true });
    }

    function switchPageSignin() {
      navigate("/signin", { replace: true });
    }

    function switchPageMovies() {
      navigate("/movies", { replace: true });
    }

    function switchPageSavedMovies() {
      navigate("/saved-movies", { replace: true });
    }

    function switchPageProfile() {
      navigate("/profile", { replace: true });
    }
 
    return (
      <div className="navigation">
      {loggedIn !== true ?
      <div className="navigation__wrappAutch">
        <button onClick={switchPageSignup} className="navigation__btnAutch">Регистрация</button>
        <button onClick={switchPageSignin} className="navigation__btnAutch navigation__btnAutch_background">Войти</button>
        </div>
        :
        <div className="navigation__wrapp">
        <button onClick={switchPageMovies} className={
          location.pathname === '/movies' ?
          `${"navigation__btn navigation__btn_active"}` : `${"navigation__btn"}`}>Фильмы</button>

        <button onClick={switchPageSavedMovies} className={
          location.pathname === '/saved-movies' ?
          `${"navigation__btn navigation__btn_active"}` : `${"navigation__btn"}`}>Сохранённые фильмы</button>
          
          
        <button onClick={switchPageProfile} className={
          location.pathname === '/profile' ?
          `${"navigation__btn navigation__btn_active"}` : `${"navigation__btn"}`}>Аккаунт<img src={iconProfile} alt='иконка кнопки аккаунт' className='navigation__btn_icon'/></button>
          

        </div>
        }
     </div>
    );
  }
  
  export default Navigation;