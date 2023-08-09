import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({ movie, saveMovie, onLike, deleteMovie, savedMovies }) {
    const location = useLocation();

    function handleSave(e) {
        e.preventDefault();
        saveMovie(movie)
      }
     

      function deleteSaveMovie(e) {
        e.preventDefault();
        deleteMovie(movie)
        
      }

      const isLiked = savedMovies.some(m => m.movieId === movie._id)
      console.log(savedMovies)
      console.log(isLiked)

    return (
        <li className="movies-list__card" key={location.pathname === '/movies' ? movie.id : movie.movieId}>
            <a className='href-container' href={movie.trailerLink}
            target="_blank"
            rel="noreferrer"
            >
            <img className='movies-list__cover' src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image} alt={movie.nameRU} />
            </a>
            <h2 className='movies-list__name'>{movie.nameRU}</h2>
            <span className='movies-list__duration'>{movie.duration}</span>
            {location.pathname === '/movies' ? <button  type='submit' className={!isLiked ? 'movies-list__btn' : 'movies-list__btn-active'} onClick={handleSave}></button> : <button className='movies-list__btn-delete' onClick={deleteSaveMovie}></button>}
        </li>
    );
  }
  
  export default MoviesCard;