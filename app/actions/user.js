import * as constants from '../constants'
import api from '../api'

export function login({ email, password }) {
  const data = { email, password }
  return (dispatch) => {
    api.user.login(data)
      .then((res) => {
        dispatch({
          type: constants.USER_LOGGED_IN,
          payload: res.body,
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
