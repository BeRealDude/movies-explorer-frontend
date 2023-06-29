import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({ movie, onSaveMovie }) {

    const location = useLocation();

    function handleSave(e) {
        e.preventDefault();
        onSaveMovie({
            cover: movie.cover,
            name: movie.name,
            duration: movie.duration,
            id: movie.length
        },);
      }
    return (
        <li className="movies-list__card" key={movie.id}>
            <img className='movies-list__cover' src={movie.cover} alt={movie.name} />
            <h2 className='movies-list__name'>{movie.name}</h2>
            <span className='movies-list__duration'>{movie.duration}</span>
            {location.pathname === '/movies' ? <button onClick={handleSave} type='submit' className='movies-list__btn'></button> : <button className='movies-list__btn-delete'></button>}
        </li>
    );
  }
  
  export default MoviesCard;