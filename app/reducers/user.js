import * as constants from '../constants'

export default function userUpdate(state = {}, { type, payload }) {
  switch (type) {
    case constants.USER_LOGGED_IN:
      return payload
    case constants.USER_LOGGED_OUT:
      return {}
    case constants.USER_LOGIN_ERROR:
      return { error: payload }
    default:
      return state
  }
}
