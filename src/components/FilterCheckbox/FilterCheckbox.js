import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";

function FilterCheckbox({
  btnShortFilms,
  setBtnShortFilms,
  btnShortFilmsSaved,
  setBtnShortFilmsSaved,
}) {
  const location = useLocation();

  function switchBtnShortFilms() {
    setBtnShortFilms(!btnShortFilms);
    localStorage.setItem("btnShortFilms", JSON.stringify(!btnShortFilms));
    console.log(!btnShortFilms, "состояние кнопки");
  }

  function switchBtnShortFilmsSaved() {
    setBtnShortFilmsSaved(!btnShortFilmsSaved);
    localStorage.setItem(
      "btnShortFilmsSaved",
      JSON.stringify(!btnShortFilmsSaved)
    );
    console.log(!btnShortFilmsSaved, "состояние кнопки сохранённых фильмов");
  }

  return (
    <>
      {location.pathname === "/movies" ? (
        <div className="checkbox-container">
          <label className="checkbox">
            <input
              className="checkbox__input"
              form="form"
              type="checkbox"
              id="checkbox"
              checked={btnShortFilms}
              onChange={switchBtnShortFilms}
            />
            <span className="checkbox__round">Короткометражки</span>
          </label>
        </div>
      ) : 
        <div className="checkbox-container">
          <label className="checkbox">
            <input
              className="checkbox__input"
              form="formSaved"
              type="checkbox"
              id="checkboxSave"
              checked={btnShortFilmsSaved}
              onChange={switchBtnShortFilmsSaved}
            />
            <span className="checkbox__round">Короткометражки</span>
          </label>
        </div>
      }
    </>
  );
}

export default FilterCheckbox;
