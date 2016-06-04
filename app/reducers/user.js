import * as constants from '../constants'

export default function userUpdate(state = {}, { type, payload }) {
  console.log(type, payload)
  if (type === constants.USER_LOGGED_IN) {
    return payload
  } else if (type === constants.USER_LOGGED_OUT) {
    return {}
  }
  return state
}
