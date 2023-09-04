import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

function SavedMovies({ movies, savedMovies, deleteMovie, saveMovie }) {

  const [loading, setLoading] = useState(false);
  const [btnShortFilms, setBtnShortFilms] = useState(false);
  const [onMessage, setMessage] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [isResMovies, setResMovies] = useState([]);


  function handleShortFilms(isResMovies) {
    const filterShortFilms = isResMovies.filter((movie) => movie.duration <= 40);
   return filterShortFilms
 }

 function showMessageResFind(nameRU, isResMovies) {
  if(nameRU.length === 0 || isResMovies.length === 0) {
    setMessage(true)
    setMessageError('Ничего не найдено')
  } 
}

  const sortMovies = (movies, valueInput, btnShortFilms) => {
    const findMoviesUser = movies.filter((movie) => {
    const nameRU = String(movie.nameRU).toLowerCase().trim();
    const nameEn = String(movie.nameEN).toLowerCase().trim();
    const value = valueInput.toLowerCase().trim();
    return  (nameRU.indexOf(value) !== -1 || nameEn.indexOf(value) !== -1)
    })
    if(btnShortFilms) {
      return handleShortFilms(findMoviesUser)
    } else {
    return findMoviesUser
    }
   }

   function findMovies(nameRU) {
    setLoading(true);
    localStorage.getItem('movies')
    localStorage.getItem('btnShortFilms')
    const resultFind = sortMovies(movies, nameRU, btnShortFilms)
    if(btnShortFilms){
    localStorage.setItem('resMovies', JSON.stringify(resultFind));
    } else {
      localStorage.setItem('resShortMovies', JSON.stringify(resultFind));
    }
    resMovies();
    showMessageResFind(nameRU, resultFind)
  }

  function resMovies() {
    setLoading(false);
    setMessage(false);
    if (localStorage.getItem('movies') && btnShortFilms) {
      const reqMovies = JSON.parse(localStorage.getItem('resMovies'));
      setResMovies(reqMovies);
    } else {
      if (localStorage.getItem('movies') && !btnShortFilms) {
      const reqShortMovies = JSON.parse(localStorage.getItem('resShortMovies'));
      setResMovies(reqShortMovies);
      }
  }
    
  }
  
    return (
      <main>
      <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} savedMovies={savedMovies} deleteMovie={deleteMovie} saveMovie={saveMovie}/>
      </div>
      </main>
    );
  }
  
  export default SavedMovies;