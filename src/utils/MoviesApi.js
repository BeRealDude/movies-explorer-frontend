class MoviesApi {
    constructor() {
      this._baseUrlMovies = 'https://api.nomoreparties.co/beatfilm-movies';
    }
  
    getMovies() {
      return fetch(this._baseUrlMovies).then(this._checkResponse);
    };
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.status}`);
      }
    }
    
  }
  
  export const moviesApi = new MoviesApi();