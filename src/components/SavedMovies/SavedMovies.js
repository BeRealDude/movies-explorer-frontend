import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function SavedMovies({
  movies,
  savedMovies,
  deleteMovie,
  saveMovie,
  noticeDelete,
}) {
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
    if (btnShortFilmsSaved === true) {
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
    const stateBtnShortSaved = JSON.parse(
      localStorage.getItem("btnShortFilmsSaved")
    );

    if (
      stateBtnShortSaved !== null &&
      stateBtnShortSaved === !btnShortFilmsSaved
    ) {
      console.log(stateBtnShortSaved);
      setBtnShortFilmsSaved(stateBtnShortSaved);
    }
  }, []);

  useEffect(() => {
    const reqMovies = JSON.parse(localStorage.getItem("resMoviesSaved"));
    if (btnShortFilmsSaved === true && reqMovies === null) {
      setResMoviesSaved(savedMovies.filter((movie) => movie.duration <= 40));
    } else {
      setResMoviesSaved(savedMovies);
    }
  }, [btnShortFilmsSaved, savedMovies]);

  useEffect(() => {
    const reqMovies = JSON.parse(localStorage.getItem("resMoviesSaved"));
    const reqWord = JSON.parse(localStorage.getItem("wordFindSaved"));

    if (btnShortFilmsSaved === true && reqMovies !== null && reqWord !== null) {
      const resultFind = sortMovies(savedMovies, reqWord, btnShortFilmsSaved);
      const reqShortMovies = resultFind.filter((movie) => movie.duration <= 40);
      setResMoviesSaved(reqShortMovies);
      if (reqShortMovies === null && reqShortMovies.length === 0) {
        showMessageResFind(reqWord, resultFind);
      }
    } else {
      if (
        reqMovies !== undefined &&
        reqMovies !== null &&
        btnShortFilmsSaved === false &&
        reqWord !== null
      ) {
        const resultFind = sortMovies(savedMovies, reqWord, btnShortFilmsSaved);
        setResMoviesSaved(resultFind);
        if (reqMovies === null && reqMovies.length === 0 && reqWord === null) {
          showMessageResFind(reqWord, resultFind);
        }
      }
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
          setResMoviesSaved={setResMoviesSaved}
          savedMovies={savedMovies}
          isResMoviesSaved={isResMoviesSaved}
        />
        {loading ? (
          <Preloader />
        ) : onMessage ? (
          <span className="errorMessage">{messageError}</span>
        ) : (
          !loading &&
          !onMessage && (
            <MoviesCardList
              movies={movies}
              savedMovies={savedMovies}
              deleteMovie={deleteMovie}
              saveMovie={saveMovie}
              resMoviesSaved={isResMoviesSaved}
              loading={loading}
            />
          )
        )}
      </div>
    </main>
  );
}

export default SavedMovies;
