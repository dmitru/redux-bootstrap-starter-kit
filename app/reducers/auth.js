import * as constants from '../constants'

import cookie from '../utils/cookie'

const initialState = {
  isAuthenticating: false,
  token: null,
  error: null,
}

const authToken = cookie.get('token')
if (authToken) {
  initialState.token = authToken
}

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.AUTH_REQUEST:
      return { ...state, isAuthenticating: true }
    case constants.AUTH_LOGGED_IN:
      return { ...state, token: payload.token, isAuthenticating: false }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState, token: null }
    case constants.AUTH_LOGIN_ERROR:
      return { ...state, error: payload, isAuthenticating: false }
    default:
      return state
  }
}
