import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';

function MoviesCardList({ movies, saveMovie, savedMovies, onLike, deleteMovie }) {
  const location = useLocation();
  // const [resSavedMovies, setSavedMovies] = useState([])

  // useEffect(() => {
  //   setSavedMovies(savedMovies)
  // }, [savedMovies])
  
  

    return (
     <>
     {location.pathname === '/movies' ? <div className="moviesCardList">
      <ul className='movies-list'>
      {movies.map((movie) => 
            <MoviesCard
              key={movie.movieId || movie.id}
              movie={movie}
              saveMovie={saveMovie}
              onLike={onLike}
              savedMovies={savedMovies}
              deleteMovie={deleteMovie}
            />
            )}
      </ul>
      {location.pathname === '/movies' ? <button className='moviesCardList__btn'>Ещё</button> : ''}
      </div> : <div className="moviesCardList">
      <ul className='movies-list'>
      {savedMovies.map((movie) => 
            <MoviesCard
              key={movie.movieId || movie.id}
              movie={movie}
              deleteMovie={deleteMovie}
              savedMovies={savedMovies}
              saveMovie={saveMovie}
            />
            )}
      </ul>
      </div>}
      </>
    );
  }
  
  export default MoviesCardList;