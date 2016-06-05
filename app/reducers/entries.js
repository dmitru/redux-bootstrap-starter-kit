import * as constants from '../constants'

const initialState = {
  isLoading: false,
  items: null,
  error: null,
}

export default function entriesUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.ENTRIES_FETCH_REQUEST:
      return { ...state, isLoading: true }
    case constants.ENTRIES_FETCH_SUCCESS:
      return { ...state, isLoading: false, items: payload }
    case constants.ENTRIES_FETCH_FAILURE:
      return { ...state, error: payload }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState }
    default:
      return state
  }
}
