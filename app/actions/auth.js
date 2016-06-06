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

export function login({ email, password, saveToken = true }) {
  return (dispatch) => {
    dispatch({
      type: constants.AUTH_REQUEST,
    })
    api.auth.login({ email, password })
      .then((res) => {
        const data = res.data
        if (saveToken) {
          saveAuthToken(data.token)
        }
        dispatch({
          type: constants.AUTH_LOGGED_IN,
          payload: data,
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.AUTH_LOGIN_ERROR,
          payload: err.data.error,
        })
      })
  }
}

export function logout() {
  cookie.unset('token')
  return {
    type: constants.AUTH_LOGGED_OUT,
  }
}
