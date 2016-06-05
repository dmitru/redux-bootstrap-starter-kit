import * as constants from '../constants'

export default function userUpdate(state = {}, { type, payload }) {
  switch (type) {
    case constants.AUTH_LOGGED_IN:
      return payload
    case constants.AUTH_LOGGED_OUT:
      return {}
    case constants.AUTH_LOGIN_ERROR:
      return { error: payload }
    default:
      return state
  }
}
