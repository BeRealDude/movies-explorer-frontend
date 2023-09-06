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

 const [noticeUpdate, setNoticeUpdate] = useState('');
 const [noticeSignIn, setNoticeSignIn] = useState('');
 const [noticeSignUp, setNoticeSignUp] = useState('');
 const [noticeDelete, setNoticeDelete] = useState('');
 const [noticeSave, setNoticeSave] = useState('');



  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNoticeUpdate('')
      setNoticeSignIn('')
      setNoticeSignUp('')
      setNoticeDelete('')
      setNoticeSave('')
    }, 3000);
    
  }, [noticeUpdate, noticeSignIn, noticeSignUp, noticeDelete, noticeSave])

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
        handleLogin(info);
        navigate("/movies");
        console.log('Успешно')
        // setMessageError("Что-то пошло не так...");
      })
      .catch(() => {
        setRegistration(false);
        setMessageError(true);
        console.log("ошибка");
        setNoticeSignUp('Что-то пошло не так...')
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
        setNoticeSignIn('Что-то пошло не так...')
        console.log("ошибка");
      });
  }

  function editInfoUser(info) {
    // const { name, email } = info;
    api.editInfo(info)
    .then(() => {
      setCurrentUser(info)
      setNoticeUpdate('Профиль успешно отредактирован')
    })
    .catch((err) => {
      console.log(err.name, 'Ошибка при обновлении профиля')
      setNoticeUpdate('Что-то пошло не так...')
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
          setNoticeDelete('Что-то пошло не так...')
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
    .catch(() => {
      setNoticeSave('Что-то пошло не так...')
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
        <Route path="/movies" element={<ProtectedRoute component={Movies} movies={movies} loggedIn={loggedIn} saveMovie={saveMovie} savedMovies={savedMovies} deleteMovie={deleteMovie} noticeSave={noticeSave} />} />
        <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} movies={movies} loggedIn={loggedIn} savedMovies={savedMovies} saveMovie={saveMovie} deleteMovie={deleteMovie} noticeDelete={noticeDelete}/>} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} onLoginOut={handleLoginOut} loggedIn={loggedIn} infoUser={infoUser} onEditInfoUser={editInfoUser} noticeUpdate={noticeUpdate} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} messageError={messageError} noticeSignUp={noticeSignUp} />} />
        <Route path="/signin" element={<Login isLoggedIn={handleLogin} onLogin={handleLogin} noticeSignIn={noticeSignIn} />} />
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
