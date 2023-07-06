import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from '../../images/icon_find.svg';
import { useEffect, useState } from 'react';


function SearchForm() {
    const [filmName, setFilmName] = useState('');
    const [filmNameTouched, setFilmNameTouched] = useState(false);
    // const [formValid, setFormValid] = useState(false);

    const [filmNameError, setfilmNameError] = useState('');
    
    function handleChange(e) {
        setFilmName(e.target.value);
        if(e.target.value.length < 0) {
            setfilmNameError('Введите название Фильма')
          } else {
            setfilmNameError('')
          }
    }

    function onClickHandler(e) {
        setFilmNameTouched(true); 
       }

       function onOnBlur(e) {
        setFilmNameTouched(false); 
       }
    
    
    function handleSubmit(e) {
        e.preventDefault();
        if (filmName === '') {
            setfilmNameError('Введите название Фильма')
        }
    }

    return (
        <section className='form-container'>
      <form className="form" name='form' id='form' noValidate onSubmit={handleSubmit}>
        <div className={(filmNameTouched) === true ? `${'form__wrapp form__wrapp_click'}` : `${'form__wrapp'}`}>
      <img className='form__icon' src={icon} alt='Иконка лупы'/>
      <input className='form__input' value={filmName || ''} onChange={handleChange} onClick={onClickHandler} onBlur={onOnBlur} type="text" name='form-movie' id='form-movie' required placeholder="Фильм"/>
      <span className='form__error' id='form-movie-error'>{filmNameTouched === false ? filmNameError : ''}</span>
      <button className='form__btn' type="submit"></button>
      </div>
      </form>
      <FilterCheckbox />
      </section>
    );
  }
  
  export default SearchForm;