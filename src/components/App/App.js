import './App.css';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { useCallback, useEffect, useState } from 'react';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { moviesApi } from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import { api } from '../../utils/MainApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistration, setRegistration] = useState(false);

  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const [movies, setMovies] = useState([]);

  const location = useLocation();

  const [infoUser, setInfoUser] = useState({
    _id: '',
    email: '',
    name: '',
  });
  
  const [currentUser, setCurrentUser] = useState({});

  const [messageError, setMessageError] = useState(false);

  const [loading, setLoading] = useState(true);
 

  const [savedMovies, setSavedMovies] = useState([]);

  // const [isLike, setLike] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    
  }, [])

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
        auth
        .getContent(jwt)
        .then((info) => {
          setLoggedIn(true);
          setCurrentUser(info);
          setInfoUser(info);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log("Ошибка", err.name);
          // localStorage.removeItem("jwt");
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  function handleRegister(info) {
      auth
      .register(info)
      .then(() => {
        setRegistration(true);
        navigate("/signin");
        console.log('Успешно')
        // setMessageError("Что-то пошло не так...");
      })
      .catch(() => {
        setRegistration(false);
        setMessageError(true);
        console.log("ошибка");
      });
  }

  function handleLogin(info) {
    const { email, password } = info;
    auth
    .authorize(email, password)
      .then((jwt) => {
        if (jwt) {
          setLoggedIn(true);
          setInfoUser({
            email,
            password,
          });
          console.log('успешный вход')
          navigate("/movies", { replace: true });
        }
      })
      .catch(() => {
        // setMessage("Что-то пошло не так...");
        setRegistration(false);
        console.log("ошибка");
      });
  }

  function editInfoUser(info) {
    // const { name, email } = info;
    api.editInfo(info)
    .then(() => {
      setCurrentUser(info)
    })
    .catch((err) => {
      console.log(err.name, 'Ошибка при обновлении профиля')
    })
  }

  

  useEffect(() => {
    if(loggedIn)
    Promise.all([api.getInfo(), api.getMovies()])
        .then(([info, data]) => {
          setCurrentUser(info);
          setSavedMovies(data)
          console.log(info, 'current user')
       })
       .catch((err) => {
        console.log("Ошибка", err);
      });
  }, [loggedIn])


  
  function handleBurgerMenuClick() {
    setBurgerMenuOpen(true);
  }

  function closeBurgerMenu() {
    setBurgerMenuOpen(false);
  }
  
  

  function handleLoginOut() {
    localStorage.clear();
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  


  function deleteMovie(movie) {
    api
        .dltMovie(movie)
        .then(() => {
          setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
        })
        .catch((err) => {
          console.log(err, 'Ошибка в удалении')
        })
  }
 

  function saveMovie(movie) {
    const isLiked = savedMovies.find(m => m.movieId === movie.id || m.movieId === movie.movieId)
    if(isLiked) {
      deleteMovie(isLiked)
    } else {
    api
    .saveMovie(movie)
    .then((newMovie) => {
      setSavedMovies(movie => [newMovie, ...movie]);
    })
  }
  }

  

  return (
    <>
    {loading ? <Preloader /> : <CurrentUserContext.Provider value={currentUser}>
      {location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile" ? (
        <Header loggedIn={loggedIn} onBurgerMenu={handleBurgerMenuClick} />
      ) : (
        ''
      )}

      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/movies" element={<ProtectedRoute component={Movies} movies={movies} loggedIn={loggedIn} saveMovie={saveMovie} savedMovies={savedMovies} deleteMovie={deleteMovie} />} />
        <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} movies={movies} loggedIn={loggedIn} savedMovies={savedMovies} saveMovie={saveMovie} deleteMovie={deleteMovie}/>} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} onLoginOut={handleLoginOut} loggedIn={loggedIn} infoUser={infoUser} onEditInfoUser={editInfoUser} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} messageError={messageError}/>} />
        <Route path="/signin" element={<Login isLoggedIn={handleLogin} onLogin={handleLogin}/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" ? (
        <Footer />
      ) : (
        ''
      )}
      
      <BurgerMenu 
      isOpen={isBurgerMenuOpen}
      onClose={closeBurgerMenu}
      />
      </CurrentUserContext.Provider>}
    </>
  );
  }

export default App;
