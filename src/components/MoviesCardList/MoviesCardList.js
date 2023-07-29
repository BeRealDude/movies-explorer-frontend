import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movies }) {
  const location = useLocation();
 

    return (
      <div className="moviesCardList">
      <ul className='movies-list'>
      {movies.map((movie) => 
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
            )}
      </ul>
      {location.pathname === '/movies' ? <button className='moviesCardList__btn'>Ещё</button> : ''}
      </div>
    );
  }
  
  export default MoviesCardList;