import './MoviesCardList.css'
// import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movies, onSaveMovie }) {
  const location = useLocation();

    return (
      <div className="moviesCardList">
      {/* <Preloader /> */}
      <ul className='movies-list'>
      {movies.map((movie, savedMoviesPage) =>
            <MoviesCard
              key={movie.id}
              movie={movie}
              onSaveMovie={onSaveMovie}
            />
            )}
      </ul>
      {location.pathname === '/movies' ? <button className='moviesCardList__btn'>Ещё</button> : ''}
      </div>
    );
  }
  
  export default MoviesCardList;