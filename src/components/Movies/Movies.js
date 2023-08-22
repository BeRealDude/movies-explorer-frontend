import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';


function Movies({ savedMovies, saveMovie, onLike, deleteMovie, loggedIn }) {
  

  const [movies, setMovies] = useState([]);
  const [isResMovies, setResMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [onMessage, setMessage] = useState(false);

  
  // const [shortFilms, setShortFilms] = useState([]);

  const [btnShortFilms, setBtnShortFilms] = useState(false);

  
 
  
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
 
  useEffect(() => {
    moviesApi.getMovies()
    .then((movie) => {
      setMovies(movie);
      localStorage.setItem('movies', JSON.stringify(movie));
    })
    .catch((err) => {
      console.log("Ошибка", err);
    });
  }, [])

  function resMovies() {
    setLoading(false);
    setMessage(false);
    // const btnShortFilmsShortMovies = JSON.parse(localStorage.getItem('btnShortFilms'));
    if (localStorage.getItem('movies') && btnShortFilms) {
      localStorage.getItem('btnShortFilms')
      const reqMovies = JSON.parse(localStorage.getItem('resMovies'));
      setResMovies(reqMovies);
      console.log(reqMovies);
      // setBtnShortFilms(true)
      // localStorage.setItem('btnShortFilms', JSON.stringify(btnShortFilms));
      // console.log(btnShortFilms, 'состояние кнопки')
    } else {
      if (localStorage.getItem('movies') && !btnShortFilms) {
        localStorage.getItem('btnShortFilms')
      const reqShortMovies = JSON.parse(localStorage.getItem('resShortMovies'));
      // setBtnShortFilms(false)
      // localStorage.setItem('btnShortFilms', JSON.stringify(btnShortFilms));
      // console.log(btnShortFilms, 'состояние кнопки')
      setResMovies(reqShortMovies);
      console.log(reqShortMovies);
      }
  }
    
  }
  

  useEffect(() => { 
    
    if (localStorage.getItem('movies') && btnShortFilms) {
     
      const reqMovies = JSON.parse(localStorage.getItem('resMovies'));
      setResMovies(reqMovies);
    } else {
      
      if(localStorage.getItem('movies') && !btnShortFilms) {
      const reqShortMovies = JSON.parse(localStorage.getItem('resShortMovies'));
      setResMovies(reqShortMovies);
      }
    }
    localStorage.setItem('btnShortFilms', JSON.stringify(btnShortFilms));
  
  }, [btnShortFilms]);




    return (
      <main>
      <div className="movies">
      <SearchForm onFindMovies={findMovies} movies={movies} btnShortFilms={btnShortFilms} setBtnShortFilms={setBtnShortFilms} />
      {!onMessage ? <MoviesCardList movies={isResMovies} findMovies={findMovies} loading={loading} saveMovie={saveMovie} savedMovies={savedMovies} onLike={onLike} deleteMovie={deleteMovie} /> : <span className='errorMessage'>{messageError}</span>}
      </div>
      </main>
    );
  }
  
  export default Movies;