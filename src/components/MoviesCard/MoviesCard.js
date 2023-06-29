import './MoviesCard.css'

function MoviesCard(props) {
    const { movie } = props;

    return (
        <li className="movies-list__card" key={movie.id}>
            <img className='movies-list__cover' src={movie.cover} alt={movie.name} />
            <h2 className='movies-list__name'>{movie.name}</h2>
            <span className='movies-list__duration'>{movie.duration}</span>
            <button type='button' className='movies-list__btn'></button>
        </li>
    );
  }
  
  export default MoviesCard;