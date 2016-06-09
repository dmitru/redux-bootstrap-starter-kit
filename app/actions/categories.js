import _ from 'lodash'

import * as constants from '../constants'
import api from '../api'


export function fetchCategories() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState()
    dispatch({
      type: constants.CATEGORIES_FETCH_REQUEST,
    })
    api.categories.getAll({ token })
      .then((res) => {
        const data = res.data
        dispatch({
          type: constants.CATEGORIES_FETCH_SUCCESS,
          payload: data,
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.CATEGORIES_FETCH_FAILURE,
          payload: err.data,
        })
      })
  }
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    const { categories } = getState()
    if (_.isNull(categories.items) && !categories.isLoading) {
      dispatch(fetchCategories())
    }
  }
}
