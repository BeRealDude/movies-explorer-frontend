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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, setMovies] = useState(moviesData);

  const location = useLocation();

  // const [currentUser, setCurrentUser] = useState({
  //   _id: '',
  //   email: '',
  //   name: '',
  // });
  
  

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
      {location.pathname === "/signup" || location.pathname === "/signin" ? (
        ""
      ) : (
        <Header loggedIn={loggedIn} />
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

      {location.pathname === "/signup" || location.pathname === "/signin" || location.pathname === "/profile" ? (
        ""
      ) : (
        <Footer />
      )}
      
      
    </>
  );
  }

export default App;
