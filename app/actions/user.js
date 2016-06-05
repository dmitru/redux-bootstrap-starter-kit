import * as constants from '../constants'
import api from '../api'

import cookie from '../utils/cookie'


const saveAuthToken = (token) => {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  cookie.set({
    name: 'token',
    value: token,
    expires,
  })
}

export function login({ email, password, saveToken = true }, callback = null) {
  return (dispatch) => {
    api.user.login({ email, password })
      .then((res) => {
        const data = res.data
        if (saveToken) {
          saveAuthToken(data.tokenId)
        }
        if (callback) {
          callback(data, null)
        }
        dispatch({
          type: constants.USER_LOGGED_IN,
          payload: data,
        })
      })
      .catch((err) => {
        if (callback) {
          callback(null, err)
        }
        dispatch({
          type: constants.USER_LOGIN_ERROR,
          payload: err.data.error,
        })
      })
  }
}

export function logout() {
  cookie.unset('token')
  return {
    type: constants.USER_LOGGED_OUT,
  }
}
