import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';

function SavedMovies({ movies, savedMovies, deleteMovie, saveMovie }) {

  
    return (
      <main>
      <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={movies} savedMovies={savedMovies} deleteMovie={deleteMovie} saveMovie={saveMovie}/>
      </div>
      </main>
    );
  }
  
  export default SavedMovies;