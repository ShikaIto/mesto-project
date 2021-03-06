export class Api {
  constructor(options) {
    this._config = options;
  }

  _checkStatus(res) {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  _sendRequest (url, method, data) {
    return fetch(url, {
      method: method,
      headers: this._config.headers,
      body: data
    })
      .then(this._checkStatus);
  }

  getProfileInfo() {
    return this._sendRequest(`${this._config.baseUrl}/users/me`, "GET", null);
  }

  saveProfileInfo(name, about) {
    const data = JSON.stringify({
        name: name,
        about: about
    })
    return this._sendRequest(`${this._config.baseUrl}/users/me`, "PATCH", data);
  }

  saveProfileAvatar(avatar) {
    const data = JSON.stringify({
      avatar: avatar
    })
    return this._sendRequest(`${this._config.baseUrl}/users/me/avatar`, "PATCH", data);
  }

  getAllCards() {
    return this._sendRequest(`${this._config.baseUrl}/cards`, "GET", null);
  }

  saveCard(name, link) {
    const data = JSON.stringify({
      name: name,
      link: link
    })
    return this._sendRequest(`${this._config.baseUrl}/cards`, "POST", data);
  }

  deleteCardFromServer(cardId) {
    return this._sendRequest(`${this._config.baseUrl}/cards/${cardId}`, "DELETE", null);
  }

  addLikeCard(cardId) {
    return this._sendRequest(`${this._config.baseUrl}/cards/likes/${cardId}`, "PUT", null);
  }

  removeLikeCard(cardId) {
    return this._sendRequest(`${this._config.baseUrl}/cards/likes/${cardId}`, "DELETE", null);
  }
}
