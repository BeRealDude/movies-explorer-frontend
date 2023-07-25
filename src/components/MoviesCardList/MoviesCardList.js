import './MoviesCardList.css'
// import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MoviesCardList({ findMovies, movies }) {
  const location = useLocation();
  
  // useEffect(()=>{
  //   if(!findMovies) {
  //   Promise.all([findMovies(movies)])
  //   .then((movie)=> {
  //     movies={movie}
  //   })
  // }
  // }, [movies])

// console.log(movies)


    return (
      <div className="moviesCardList">
      {/* <Preloader /> */}
      <ul className='movies-list'>
      {movies.map((movie) => 
            <MoviesCard
              key={movie.id}
              movie={movie}
              // findMovies={findMovies}
            />
            )}
      </ul>
      {location.pathname === '/movies' ? <button className='moviesCardList__btn'>Ещё</button> : ''}
      </div>
    );
  }
  
  export default MoviesCardList;