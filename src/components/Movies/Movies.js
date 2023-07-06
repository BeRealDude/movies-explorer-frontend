import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ movies, onSaveMovie }) {
    return (
      <main>
      <div className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} onSaveMovie={onSaveMovie} />
      </div>
      </main>
    );
  }
  
  export default Movies;