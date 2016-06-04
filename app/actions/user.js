import * as constants from '../constants'
import api from '../api'

export function login({ email, password }) {
  return (dispatch) => {
    api.user.login({ email, password })
      .then((res) => {
        const data = res.data
        dispatch({
          type: constants.USER_LOGGED_IN,
          payload: data,
        })
      })
      .catch((err) => {
        console.log(['catch', err])
      })
  }
}

export function logout() {
  return {
    type: constants.USER_LOGGED_OUT,
  }
}
