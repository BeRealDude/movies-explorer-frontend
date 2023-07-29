import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';


function Movies() {

  const [movies, setMovies] = useState([]);
  const [isResMovies, setResMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [onMessage, setMessage] = useState(false);



function showMessageResFind(nameRU) {
  if(nameRU.length === 0 || isResMovies.length === 0) {
    setMessage(true)
    setMessageError('Ничего не найдено')
  } 
}
  
  const sortMovies = (movies, valueInput) => {
    const findMoviesUser = movies.filter((movie) => {
    const nameRU = String(movie.nameRU).toLowerCase().trim();
    const nameEn = String(movie.nameEN).toLowerCase().trim();
    const value = valueInput.toLowerCase().trim();
    return  (nameRU.indexOf(value) !== -1 || nameEn.indexOf(value) !== -1)
    })
    return findMoviesUser
   }

   function findMovies(nameRU) {
    setLoading(true);
    localStorage.getItem('movies')
    const resultFind = sortMovies(movies, nameRU)
    localStorage.setItem('resMovies', JSON.stringify(resultFind));
    resMovies();
    showMessageResFind(nameRU)
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
    if (localStorage.getItem('movies')) {
      const reqMovies = JSON.parse(localStorage.getItem('resMovies'));
      setResMovies(reqMovies);
    }
    
  }

  console.log(movies, 'получение фильмов с апи')
  console.log(isResMovies, 'полученные фильмы по запросу в поиске')
  
    return (
      <main>
      <div className="movies">
      <SearchForm onFindMovies={findMovies} movies={movies} />
      {!onMessage ? <MoviesCardList movies={isResMovies} findMovies={findMovies} loading={loading} /> : <span className='errorMessage'>{messageError}</span>}
      </div>
      </main>
    );
  }
  
  export default Movies;