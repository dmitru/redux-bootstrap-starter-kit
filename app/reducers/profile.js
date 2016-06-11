import * as constants from '../constants'

const initialState = {
  isLoading: false,
  user: null,
  error: null,
}

export default function profileUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.PROFILE_FETCH_REQUEST:
      return { ...state, isLoading: true }
    case constants.PROFILE_FETCH_SUCCESS:
      return { ...state, isLoading: false, user: payload }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState }
    default:
      return state
  }
}

export const getUserProfile = (state) => state.profile.user
