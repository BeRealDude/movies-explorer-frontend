
import "./FilterCheckbox.css";

function FilterCheckbox({ btnShortFilms, setBtnShortFilms }) {

  function switchBtnShortFilms(e) {
    console.log(btnShortFilms);
    setBtnShortFilms(e.target.checked);
    // localStorage.setItem('btnShortFilms', JSON.stringify(btnShortFilms));
    //   console.log(btnShortFilms, 'состояние кнопки')
  }

  return (
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
  );
}

export default FilterCheckbox;
