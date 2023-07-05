import './BurgerMenu.css'
import iconProfile from '../../images/icon_profile.svg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const body = document.querySelector('body');

function BurgerMenu(props) {
    const navigate = useNavigate();

    function goToMain() {
        navigate("/", { replace: true })
        props.onClose()
    }

    function goToMovies() {
        navigate("/movies", { replace: true })
        props.onClose()
    }

    function goToSavedMovies() {
        navigate("/saved-movies", { replace: true })
        props.onClose()
    }

    function goToProfile() {
        navigate("/profile", { replace: true })
        props.onClose()
    }


    useEffect(() => {
        if(props.isOpen === true) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'overlay';
        }
      }, [props.isOpen]);

    return (
        <div
        className={`menu ${props.isOpen && "menu_opened"}`}
      >
        <div className="container">
          <button
            type="button"
            className="container__close"
            onClick={props.onClose}
          />
          <div className='container__wrapp-btnNav'>
          <button onClick={goToMain} className='container__btnNav'>Главная</button>
          <button onClick={goToMovies} className='container__btnNav'>Фильмы</button>
          <button onClick={goToSavedMovies} className='container__btnNav'>Сохранённые фильмы</button>
          </div>
          <button onClick={goToProfile} className='btnAcct'>Аккаунт<img src={iconProfile} alt='иконка кнопки аккаунт' className='icon'/></button>
        </div>
      </div>
    );
  }
  
  export default BurgerMenu;