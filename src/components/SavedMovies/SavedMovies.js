import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies }) {
    return (
      <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
      </div>
    );
  }
  
  export default SavedMovies;