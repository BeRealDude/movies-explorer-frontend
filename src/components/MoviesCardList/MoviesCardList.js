import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  movies,
  saveMovie,
  savedMovies,
  onLike,
  deleteMovie,
  cardsDisplay,
  loadsCards,
  resMoviesSaved,
}) {
  const location = useLocation();
  console.log(resMoviesSaved);
  console.log(movies);

  const showMoreButton = movies && movies.length > cardsDisplay;

  return (
    <>
      {location.pathname === "/movies" ? (
        <div className="moviesCardList">
          <ul className="movies-list">
            {movies !== null &&
              movies
                .slice(null, cardsDisplay)
                .map((movie) => (
                  <MoviesCard
                    key={movie.movieId || movie.id}
                    movie={movie}
                    saveMovie={saveMovie}
                    onLike={onLike}
                    savedMovies={savedMovies}
                    deleteMovie={deleteMovie}
                  />
                ))}
          </ul>
          {showMoreButton && (
            <button className="moviesCardList__btn" onClick={loadsCards}>
              Ещё
            </button>
          )}
        </div>
      ) : (
          <div className="moviesCardList">
            <ul className="movies-list">
              {resMoviesSaved !== null &&
                resMoviesSaved.map((movie) => (
                  <MoviesCard
                    key={movie.movieId || movie.id}
                    movie={movie}
                    deleteMovie={deleteMovie}
                    savedMovies={savedMovies}
                    saveMovie={saveMovie}
                    resMoviesSaved={resMoviesSaved}
                  />
                ))}
            </ul>
          </div>
        
      )}
    </>
  );
}

export default MoviesCardList;
