import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from '../../images/icon_find.svg';
import { useState } from 'react';


function SearchForm({ onFindMovies, movies}) {
    const [nameRU, setnameRU] = useState('');
    const [filmNameTouched, setFilmNameTouched] = useState(false);
    // const [formValid, setFormValid] = useState(false);

    const [filmNameError, setfilmNameError] = useState('');
    
    function handleChange(e) {
      setnameRU(e.target.value);
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
       
       
       

    
    function handleSubmitFindMovies(e) {
        e.preventDefault();
        // const res = localStorage.getItem('movies');
        onFindMovies(nameRU)
        // console.log(onFindMovies(nameRU), 'результат')

        if (nameRU === '') {
            setfilmNameError('Введите название Фильма')
        }
    }
    

    return (
        <section className='form-container'>
      <form className="form" name='form' id='form' noValidate onSubmit={handleSubmitFindMovies}>
        <div className={(filmNameTouched) === true ? `${'form__wrapp form__wrapp_click'}` : `${'form__wrapp'}`}>
      <img className='form__icon' src={icon} alt='Иконка лупы'/>
      <input className='form__input' value={nameRU || ''} onChange={handleChange} onClick={onClickHandler} onBlur={onOnBlur} type="text" name='form-movie' id='form-movie' required placeholder="Фильм"/>
      <span className='form__error' id='form-movie-error'>{filmNameTouched === false ? filmNameError : ''}</span>
      <button className='form__btn' type="submit"></button>
      </div>
      </form>
      <FilterCheckbox />
      </section>
    );
  }
  
  export default SearchForm;