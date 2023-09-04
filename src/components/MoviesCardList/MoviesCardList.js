import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';


function MoviesCardList({ movies, saveMovie, savedMovies, onLike, deleteMovie, cardsDisplay, loadsCards }) {
  const location = useLocation();
 
  
  
  const displayForBtnMore = movies ? movies.length : null;
  const showMoreButton = movies && movies.length > cardsDisplay;

    return (
     <>
     {location.pathname === '/movies' ? <div className="moviesCardList">
      <ul className='movies-list'>
      {movies !== null && movies.slice(null, cardsDisplay).map((movie) => 
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
      {displayForBtnMore && showMoreButton && <button className='moviesCardList__btn' onClick={loadsCards}>Ещё</button>}
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