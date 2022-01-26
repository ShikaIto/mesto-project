import { inputProfileJob, inputProfileName, inputProfileAvatar, inputCardName, 
  inputCardImage } from "../pages/index.js";

const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-6",
    headers: {
      authorization: "df2a87c1-ee4d-42a8-8cbf-5bf5b4af8b77",
      "Content-Type": "application/json"
    }
  }

function checkStatus(res) {
  if(res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export  const profileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers
  })
  .then(checkStatus)
}

export const saveProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: inputProfileName.value,
      about: inputProfileJob.value
    })
  }) 
}

export const saveProfileAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputProfileAvatar.value
    })
  })
}

export const cardInfo = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  })
  .then(checkStatus)
}

export const saveCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: inputCardName.value,
      link: inputCardImage.value
    })
  })
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(checkStatus)
  .catch((err) => {
    console.log(err);
  })
}

export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
  .then(checkStatus)
}

export const removeLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(checkStatus)
}