import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, savedMovies, deleteMovie }) {

    return (
      <main>
      <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} savedMovies={savedMovies} deleteMovie={deleteMovie} />
      </div>
      </main>
    );
  }
  
  export default SavedMovies;