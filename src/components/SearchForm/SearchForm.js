import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import icon from "../../images/icon_find.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({
  onFindMovies,
  btnShortFilms,
  setBtnShortFilms,
  findMoviesSaved,
  btnShortFilmsSaved,
  setBtnShortFilmsSaved,
  noticeFind,
  noticeDelete,
  noticeSave,
  setResMoviesSaved,
  savedMovies
}) {
  const location = useLocation();

  const [nameRU, setnameRU] = useState("");
  const [filmNameTouched, setFilmNameTouched] = useState(false);
  const [filmNameError, setfilmNameError] = useState("");

  const [nameRUSaved, setnameRUSaved] = useState("");
  const [filmNameTouchedSaved, setFilmNameTouchedSaved] = useState(false);
  const [filmNameErrorSaved, setfilmNameErrorSaved] = useState("");

  function handleChange(e) {
    setnameRU(e.target.value);
    if (e.target.value.length < 0) {
      setfilmNameError("Введите название Фильма");
    } else {
      setfilmNameError("");
    }
  }

  function onClickHandler(e) {
    setFilmNameTouched(true);
  }

  function onOnBlur(e) {
    setFilmNameTouched(false);
  }

  function handleChangeSaved(e) {
    setnameRUSaved(e.target.value);
    if (e.target.value.length < 0) {
      setfilmNameErrorSaved("Введите название Фильма");
    } else {
      setfilmNameErrorSaved("");
    }
  }

  function onClickHandlerSaved(e) {
    setFilmNameTouchedSaved(true);
  }

  function onOnBlurSaved(e) {
    setFilmNameTouchedSaved(false);
  }

  function handleSubmitFindMovies(e) {
    e.preventDefault();
    if (nameRU !== null && nameRU !== "") {
      onFindMovies(nameRU);
      localStorage.setItem("wordFind", JSON.stringify(nameRU));
    } else {
      setfilmNameError("Нужно ввести ключевое слово");
      localStorage.removeItem("wordFind");
    }
  }

  function handleSubmitFindMoviesSaved(e) {
    console.log("Поиск по сохранённым");
    e.preventDefault();
    if (nameRUSaved !== null && nameRUSaved !== "") {
      findMoviesSaved(nameRUSaved);
      localStorage.setItem("wordFindSaved", JSON.stringify(nameRUSaved));
    } else {
      setfilmNameErrorSaved("Нужно ввести ключевое слово");
      localStorage.removeItem("wordFindSaved");
    }
  }

  useEffect(() => {
    const wordFind = JSON.parse(localStorage.getItem("wordFind"));
    setnameRU(wordFind);
  }, []);

  useEffect(() => {
    const wordFindSaved = JSON.parse(localStorage.getItem("wordFindSaved"));
    setnameRUSaved(wordFindSaved);
  }, []);
  
 
  return (
    <>
      {location.pathname === "/movies" ? (
        <section className="form-container">
          <form
            className="form"
            name="form"
            id="form"
            noValidate
            onSubmit={handleSubmitFindMovies}
          >
            <div
              className={
                filmNameTouched === true
                  ? `${"form__wrapp form__wrapp_click"}`
                  : `${"form__wrapp"}`
              }
            >
              <img className="form__icon" src={icon} alt="Иконка лупы" />
              <input
                className="form__input"
                value={nameRU || ""}
                onChange={handleChange}
                onClick={onClickHandler}
                onBlur={onOnBlur}
                type="text"
                name="form-movie"
                id="form-movie"
                required
                placeholder="Фильм"
              />
              <span className="form__error" id="form-movie-error">
                {filmNameTouched === false ? filmNameError : ""}
              </span>
              <span className="form__error">{noticeFind}</span>
              <span className="form__error">{noticeSave}</span>
              <button className="form__btn" type="submit"></button>
            </div>
          </form>
          <FilterCheckbox
            btnShortFilms={btnShortFilms}
            setBtnShortFilms={setBtnShortFilms}
          />
        </section>
      ) : (
        <section className="form-container">
          <form
            className="form"
            name="formSaved"
            id="formSaved"
            noValidate
            onSubmit={handleSubmitFindMoviesSaved}
          >
            <div
              className={
                filmNameTouchedSaved === true
                  ? `${"form__wrapp form__wrapp_click"}`
                  : `${"form__wrapp"}`
              }
            >
              <img className="form__icon" src={icon} alt="Иконка лупы" />
              <input
                className="form__input"
                value={nameRUSaved || ""}
                onChange={handleChangeSaved}
                onClick={onClickHandlerSaved}
                onBlur={onOnBlurSaved}
                type="text"
                name="form-movie"
                id="form-movie"
                required
                placeholder="Фильм"
              />
              <span className="form__error" id="formSaved-movie-error">
                {filmNameTouchedSaved === false ? filmNameErrorSaved : ""}
              </span>
              <span className="form__error">{noticeDelete}</span>
              <button className="form__btn" type="submit"></button>
            </div>
          </form>
          <FilterCheckbox
            btnShortFilmsSaved={btnShortFilmsSaved}
            setBtnShortFilmsSaved={setBtnShortFilmsSaved}
          />
        </section>
      )}
    </>
  );
}

export default SearchForm;
