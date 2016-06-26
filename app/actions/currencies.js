
import _ from 'lodash'

import * as constants from '../constants'
import api from '../api'

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch({
      type: constants.CURRENCIES_FETCH_REQUEST,
    })
    api.currencies.get()
      .then((res) => {
        const data = res.body
        dispatch({
          type: constants.CURRENCIES_FETCH_SUCCESS,
          payload: data,
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.CURRENCIES_FETCH_FAILURE,
          payload: err.data,
        })
      })
  }
}

export function fetchCurrenciesIfNeeded() {
  return (dispatch, getState) => {
    const { currencies } = getState()
    if (_.isNull(currencies.items) && !currencies.isLoading) {
      dispatch(fetchCurrencies())
    }
  }
}
