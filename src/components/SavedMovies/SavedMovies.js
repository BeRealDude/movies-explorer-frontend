import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function SavedMovies({ movies, savedMovies, deleteMovie, saveMovie, noticeDelete }) {
  const [loading, setLoading] = useState(false);
  const [btnShortFilmsSaved, setBtnShortFilmsSaved] = useState(false);
  const [onMessage, setMessage] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [isResMoviesSaved, setResMoviesSaved] = useState([]);

  const location = useLocation();

  function handleShortFilms(isResMoviesSaved) {
    const filterShortFilms = isResMoviesSaved.filter(
      (movie) => movie.duration <= 40
    );
    return filterShortFilms;
  }

  function showMessageResFind(nameRU, isResMovies) {
    if (nameRU.length === 0 || isResMovies.length === 0) {
      setMessage(true);
      setMessageError("Ничего не найдено");
    }
  }

  const sortMovies = (savedMovies, valueInput, btnShortFilmsSaved) => {
    const findMoviesUser = savedMovies.filter((movie) => {
      const nameRU = String(movie.nameRU).toLowerCase().trim();
      const nameEn = String(movie.nameEN).toLowerCase().trim();
      const value = valueInput.toLowerCase().trim();
      return nameRU.indexOf(value) !== -1 || nameEn.indexOf(value) !== -1;
    });
    if (btnShortFilmsSaved) {
      return handleShortFilms(findMoviesUser);
    } else {
      return findMoviesUser;
    }
  };

  function findMoviesSaved(nameRU) {
    setLoading(true);
    // localStorage.getItem("movies");
    // localStorage.getItem("btnShortFilmsSaved");
    const resultFind = sortMovies(savedMovies, nameRU, btnShortFilmsSaved);
    if (btnShortFilmsSaved === false) {
      localStorage.setItem("resMoviesSaved", JSON.stringify(resultFind));
    } else {
      localStorage.setItem("resShortMoviesSaved", JSON.stringify(resultFind));
    }
    resMovies();
    showMessageResFind(nameRU, resultFind);
  }

  function resMovies() {
    setLoading(false);
    setMessage(false);
    if (savedMovies && btnShortFilmsSaved === false) {
      const reqMovies = JSON.parse(localStorage.getItem("resMoviesSaved"));
      setResMoviesSaved(reqMovies);
    } else {
      if (savedMovies && btnShortFilmsSaved === true) {
        const reqShortMovies = JSON.parse(
          localStorage.getItem("resShortMoviesSaved")
        );
        setResMoviesSaved(reqShortMovies);
      }
    }
  }

  useEffect(() => {
    const stateBtnShortSaved = JSON.parse(localStorage.getItem("btnShortFilmsSaved"));

    if (stateBtnShortSaved !== null && stateBtnShortSaved === !btnShortFilmsSaved) {
      console.log(stateBtnShortSaved);
      setBtnShortFilmsSaved(stateBtnShortSaved);
    }
  }, []);
  

  

  useEffect(() => {
    const reqMovies = JSON.parse(localStorage.getItem("resMoviesSaved"));

      if (btnShortFilmsSaved === true && reqMovies !== null) {
        const reqShortMovies = reqMovies.filter(movie => movie.duration <= 40);
        setResMoviesSaved(reqShortMovies);
        if(reqShortMovies === null && reqShortMovies.length === 0) {
          setMessageError("Ничего не найдено");
        }
      } else {
        if(reqMovies !== undefined && reqMovies !== null && btnShortFilmsSaved === false) {
              setResMoviesSaved(reqMovies);
            }
        setResMoviesSaved(savedMovies);
      }
      
     
  }, [btnShortFilmsSaved, savedMovies]);


  
  return (
    <main>
      <div className="saved-movies">
        <SearchForm
          findMoviesSaved={findMoviesSaved}
          btnShortFilmsSaved={btnShortFilmsSaved}
          setBtnShortFilmsSaved={setBtnShortFilmsSaved}
          noticeDelete={noticeDelete}
        />
        {loading ? <Preloader /> : onMessage ? 
          <span className="errorMessage">{messageError}</span>
          : !loading && !onMessage && 
          <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          deleteMovie={deleteMovie}
          saveMovie={saveMovie}
          resMoviesSaved={isResMoviesSaved}
          loading={loading}
        />}
      </div>
    </main>
  );
}

export default SavedMovies;
