import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({ movie }) {
// console.log(movie, 'карточка');
    const location = useLocation();

    // function handleSave(e) {
    //     e.preventDefault();
    //     onSaveMovie({
    //         cover: movie.cover,
    //         name: movie.name,
    //         duration: movie.duration,
    //         id: movie.length
    //     },);
    //   }


    return (
        <li className="movies-list__card" key={movie.id}>
            <a href={movie.trailerLink}
            target="_blank"
            rel="noreferrer"
            >
            <img className='movies-list__cover' src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU} />
            </a>
            <h2 className='movies-list__name'>{movie.nameRU}</h2>
            <span className='movies-list__duration'>{movie.duration}</span>
            {location.pathname === '/movies' ? <button  type='submit' className='movies-list__btn'></button> : <button className='movies-list__btn-delete'></button>}
        </li>
    );
  }
  
  export default MoviesCard;