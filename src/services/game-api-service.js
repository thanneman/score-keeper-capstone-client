import TokenService from '../services/token-service'
import config from '../config'

const GameApiService = {
  // GET all games for logged in user
  getUserGames() {
    return fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserId('user_id')}/games`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
            .catch(error => {
        console.error(error)
      })
  },
  // POST new game for logged in user with required data needed
  postUserGame(gameId, course_name, date, course_par, front_score, back_score, notes) {
    return fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserId('userId')}/games`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        game_id: gameId,
        course_name,
        date,
        course_par,
        front_score,
        back_score,
        notes,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // DELETE a game
  deleteGame(gameId, cb) {
    fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
  },
  // DELETE a game for the logged in user
  deleteUserGame(gameId, cb) {
    fetch(`${config.API_ENDPOINT}/users/${TokenService.getUserId('userId')}/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
      })
      .then(data => {
        cb(gameId)
      })
      .catch(error => {
        console.error(error)
      })
  },
}

export default GameApiService