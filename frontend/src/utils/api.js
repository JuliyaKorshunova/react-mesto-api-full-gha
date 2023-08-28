class Api {
  constructor(options) {
    this._url = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.authorization;
  }

  _serviceMethod(res) {return res.ok ? res.json() : Promise.reject}

  // Оптимизация then
  // _request(url, options) {
  //   return fetch(`${this._url}${url}`, options)
  //     .then(this._serviceMethod)
  // }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        // authorization: this._authorization
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._serviceMethod)
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        // authorization: this._authorization
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._serviceMethod)
  }

  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.username,
        about: data.profession,
      })
    })
    .then(this._serviceMethod)
  }

  setNewAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._serviceMethod)
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      // headers: this._headers,
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link,
    })
    })
    .then(this._serviceMethod)
  }

  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._serviceMethod)
  }

  deleteLike(cardId, token) {
    return fetch (`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._serviceMethod)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._serviceMethod)
  }
}

//Создаем экземпляр Api
const api = new Api({
  baseUrl: 'http://localhost:3000',
  // headers: {
  //   authorization: '6b284fd9-2112-4db5-ba62-219123f88ff3',
  //   'Content-Type': 'application/json'
  // }
});
export default api