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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  function handleLogin() {
    setLoggedIn(true);
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
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
  }

export default App;
