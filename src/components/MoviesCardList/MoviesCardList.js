import './MoviesCardList.css'
// import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
    return (
      <div className="moviesCardList">
      {/* <Preloader /> */}
      <ul className='movies-list'>
      {movies.map((movie) => 
            <MoviesCard
              key={movie.id}
              movie={movie}
            />
            )}
      </ul>
      <button className='moviesCardList__btn'>Ещё</button>
      </div>
    );
  }
  
  export default MoviesCardList;