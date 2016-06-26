import * as constants from '../constants'

const initialState = {
  isLoading: false,
  items: null,
  error: null,
}

export default function reduce(state = initialState, { type, payload }) {
  switch (type) {
    case constants.CURRENCIES_FETCH_REQUEST:
      return { ...state, isLoading: true }
    case constants.CURRENCIES_FETCH_SUCCESS:
      return { ...state, isLoading: false, error: null, items: payload }
    case constants.CURRENCIES_FETCH_FAILURE:
      return { ...initialState, error: payload }
    default:
      return state
  }
}

export const getCurrencies = (state) => state.currencies.items
