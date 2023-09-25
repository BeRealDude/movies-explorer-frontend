class MainApi {
  constructor() {
    this._baseUrl = 'https://api.nvs.diploma.nomoredomains.rocks';
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json',
      },
    });
  }

  getMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json',
      },
    });
  }

  editInfo(info) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
    },
      body: JSON.stringify({
        name: info.name,
        email: info.email,
      }),
    });
  }

  saveMovie(movie) {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
    },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }

  dltMovie(movie) {
    console.log(movie)
    return this._request(`${this._baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
    },
    });
  }

  addLike(id, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
      },
      });
    } else {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
      },
      });
    }
  }

  editAvatar(info) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
    },
      body: JSON.stringify({
        avatar: info.avatar,
      }),
    });
  }
}

export const api = new MainApi();