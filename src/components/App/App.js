import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { useState } from 'react';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import moviesData from '../../utils/moviesData';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const [movies, setMovies] = useState(moviesData);

  const location = useLocation();
  
  // const [currentUser, setCurrentUser] = useState({
  //   _id: '',
  //   email: '',
  //   name: '',
  // });
  
  function handleBurgerMenuClick() {
    setBurgerMenuOpen(true);
  }

  function closeBurgerMenu() {
    setBurgerMenuOpen(false);
  }
  

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLoginOut() {
    setLoggedIn(false);
  }

  const saveMovie = (newMovie) => {
    setMovies(movie => [newMovie, ...movie]);
  }


  return (
    <>
      {location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile" ? (
        <Header loggedIn={loggedIn} onBurgerMenu={handleBurgerMenuClick}/>
      ) : (
        ''
      )}

      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/movies" element={<Movies movies={movies} onSaveMovie={saveMovie} />} />
        <Route path="/saved-movies" element={<SavedMovies movies={movies}/>} />
        <Route path="/profile" element={<Profile isLoggedIn={handleLoginOut} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login isLoggedIn={handleLogin}/>} />
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
    </>
  );
  }

export default App;
