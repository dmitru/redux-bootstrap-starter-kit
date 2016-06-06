import * as constants from '../constants'

const initialState = {
  isLoading: false,
  items: null,
  error: null,
}

export default function categoriesUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.CATEGORIES_FETCH_REQUEST:
      return { ...state, isLoading: true }
    case constants.CATEGORIES_FETCH_SUCCESS:
      return { ...state, isLoading: false, items: payload }
    case constants.CATEGORIES_FETCH_FAILURE:
      return { ...state, error: payload }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState }
    default:
      return state
  }
}
