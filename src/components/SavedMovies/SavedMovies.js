import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies }) {
    return (
      <main>
      <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
      </div>
      </main>
    );
  }
  
  export default SavedMovies;