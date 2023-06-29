import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ movies, onSaveMovie }) {
    return (
      <div className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} onSaveMovie={onSaveMovie} />
      </div>
    );
  }
  
  export default Movies;