import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { useScreenResolution } from '../../hooks/useScreenResolution'

function Movies({ savedMovies, saveMovie, onLike, deleteMovie, loggedIn }) {
  

  const [movies, setMovies] = useState([]);
  const [isResMovies, setResMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [onMessage, setMessage] = useState(false);

 

  const [btnShortFilms, setBtnShortFilms] = useState(false);

  const QTY_CARDS_LARGE_SCREEN = 12;
  const QTY_CARDS_MIDDLE_SCREEN = 8;
  const QTY_CARDS_SMALL_SCREEN = 5;
  
  const LOADS_ADD_CARDS_LG_MID = 3;
  const LOADS_ADD_CARDS_SMALL = 2;


  
  const desktop = useScreenResolution("(min-width: 1280px)");
  const tablet = useScreenResolution("(min-width: 768px)");
  const telephone = useScreenResolution("(min-width: 480px)");

  const initialCards = desktop
  ? QTY_CARDS_LARGE_SCREEN
  : tablet
  ? QTY_CARDS_MIDDLE_SCREEN
  : telephone
  && QTY_CARDS_SMALL_SCREEN
  

  const [cardsDisplay, setCardsDisplay] = useState(initialCards)
 

  const loadsCards = () => {
    loadsCardsVis();
  };


  const loadsCardsVis = () => {
    if (desktop) {
      return setCardsDisplay(cardsDisplay + LOADS_ADD_CARDS_LG_MID);
    }

    if (tablet) {
      return setCardsDisplay(cardsDisplay + LOADS_ADD_CARDS_LG_MID);
    }

    setCardsDisplay(cardsDisplay + LOADS_ADD_CARDS_SMALL);
  };

  
  function handleShortFilms(isResMovies) {
     const filterShortFilms = isResMovies.filter((movie) => movie.duration <= 40);
    return filterShortFilms
  }



function showMessageResFind(nameRU, isResMovies) {
  if(nameRU.length === 0 || isResMovies.length === 0) {
    setMessage(true)
    setMessageError('Ничего не найдено')
  } 
}
  
  const sortMovies = (movies, valueInput, btnShortFilms) => {
    const findMoviesUser = movies.filter((movie) => {
    const nameRU = String(movie.nameRU).toLowerCase().trim();
    const nameEn = String(movie.nameEN).toLowerCase().trim();
    const value = valueInput.toLowerCase().trim();
    return  (nameRU.indexOf(value) !== -1 || nameEn.indexOf(value) !== -1)
    })
    if(btnShortFilms) {
      return handleShortFilms(findMoviesUser)
    } else {
    return findMoviesUser
    }
   }

   function findMovies(nameRU) {
    setLoading(true);
    localStorage.getItem('movies')
    localStorage.getItem('btnShortFilms')
    const resultFind = sortMovies(movies, nameRU, btnShortFilms)
    if(btnShortFilms){
    localStorage.setItem('resMovies', JSON.stringify(resultFind));
    } else {
      localStorage.setItem('resShortMovies', JSON.stringify(resultFind));
    }
    resMovies();
    showMessageResFind(nameRU, resultFind)
  }
 
  useEffect(() => {
    moviesApi.getMovies()
    .then((movie) => {
      setMovies(movie);
      localStorage.setItem('movies', JSON.stringify(movie));
    })
    .catch((err) => {
      console.log("Ошибка", err);
    });
  }, [])

  function resMovies() {
    setLoading(false);
    setMessage(false);
    if (localStorage.getItem('movies') && btnShortFilms) {
      const reqMovies = JSON.parse(localStorage.getItem('resMovies'));
      setResMovies(reqMovies);
    } else {
      if (localStorage.getItem('movies') && !btnShortFilms) {
      const reqShortMovies = JSON.parse(localStorage.getItem('resShortMovies'));
      setResMovies(reqShortMovies);
      }
  }
    
  }
  
  useEffect(()=> {
    const stateBtnShort = JSON.parse(localStorage.getItem('btnShortFilms'))
    
    if(stateBtnShort !== null && stateBtnShort === !btnShortFilms) {
      console.log(stateBtnShort)
      setBtnShortFilms(stateBtnShort)
    }
  }, [])

  useEffect(() => { 
    
    if (localStorage.getItem('movies') && btnShortFilms) {
     
      const reqMovies = JSON.parse(localStorage.getItem('resMovies'));
      setResMovies(reqMovies);
    } else {
      
      if(localStorage.getItem('movies') && !btnShortFilms) {
      const reqShortMovies = JSON.parse(localStorage.getItem('resShortMovies'));
      setResMovies(reqShortMovies);
      }
    }
   
  
  }, [btnShortFilms]);
  
  // console.log(localStorage.getItem('btnShortFilms'))

    return (
      <main>
      <div className="movies">
      <SearchForm onFindMovies={findMovies} movies={movies} btnShortFilms={btnShortFilms} setBtnShortFilms={setBtnShortFilms} />
      {loading && <Preloader />}
      {!loading && !onMessage ? <MoviesCardList movies={isResMovies} findMovies={findMovies} loading={loading} saveMovie={saveMovie} savedMovies={savedMovies} onLike={onLike} deleteMovie={deleteMovie} cardsDisplay={cardsDisplay} loadsCards={loadsCards} /> : <span className='errorMessage'>{messageError}</span>}
      </div>
      </main>
    );
  }
  
  export default Movies;