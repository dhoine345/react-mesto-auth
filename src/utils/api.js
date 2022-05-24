import { apiConfig } from "./constants";

class Api {
  constructor(config) {
    this._header = config.headers;
    this._baseUrl = config.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._header
    })
      .then(res => this._getResponseData(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._header
    })
      .then(res => this._getResponseData(res))
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => this._getResponseData(res))
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._header
    })
      .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: !isLiked ? 'DELETE' : 'PUT',
      headers: this._header
    })
      .then(res => this._getResponseData(res))
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => this._getResponseData(res))
  }
}

export const api = new Api(apiConfig);
