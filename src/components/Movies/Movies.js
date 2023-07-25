import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { useState } from 'react';


function Movies() {

  const [movies, setMovies] = useState([]);
  const [isResMovies, setResMovies] = useState([]);




  
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
    const resultFind = sortMovies(movies, nameRU)
    
    console.log(localStorage)
    moviesApi.getMovies()
    .then((movie) => {
      localStorage.setItem('movies', JSON.stringify(resultFind));
      setMovies(movie);
      resMovies()
    })
    console.log(isResMovies)
  }

  function resMovies() {
    if (localStorage.getItem('movies')) {
      const reqMovies = JSON.parse(localStorage.getItem('movies'));
      setResMovies(reqMovies);
    }

  }

  // function formMovie(nameRU) {
  //   findMovies(nameRU)
  //   return isResMovies

  // }
  
  
  
    return (
      <main>
      <div className="movies">
      <SearchForm onFindMovies={findMovies} movies={movies} />
      <MoviesCardList movies={isResMovies} findMovies={findMovies}/>
      </div>
      </main>
    );
  }
  
  export default Movies;