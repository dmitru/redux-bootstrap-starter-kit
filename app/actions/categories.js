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
        const data = res.body
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

export function addCategory({ category }) {
  return (dispatch) => {
    // Optimistically add the new category to the list of categories
    // Generate temporary id for the category, which later will be replaced with real id
    // when the server returns response
    const temporaryId = `tmp_id_${(new Date).getTime()}_${Math.random() * 100000000}`
    dispatch({
      type: constants.CATEGORIES_ADD_REQUEST,
      payload: {
        category: {
          ...category,
          id: temporaryId,
          isSaving: true,
        },
      },
    })

    api.categories.create({ category })
      .then((res) => {
        dispatch({
          type: constants.CATEGORIES_ADD_SUCCESS,
          payload: {
            temporaryId,
            category: res.body,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.CATEGORIES_ADD_FAILURE,
          payload: {
            temporaryId,
            category: err,
          },
        })
      })
  }
}

export function toggleSelection({ id, ids }) {
  if (!_.isUndefined(ids)) {
    return {
      type: constants.CATEGORIES_TOGGLE_SELECTION,
      payload: {
        ids,
      },
    }
  }
  return {
    type: constants.CATEGORIES_TOGGLE_SELECTION,
    payload: {
      ids: [id],
    },
  }
}

export function updateCategory({ category }) {
  return (dispatch) => {
    dispatch({
      type: constants.CATEGORIES_UPDATE,
      payload: {
        category: {
          ...category,
          isSaving: true,
        },
      },
    })

    api.categories.update({ category })
      .then(() => {
        dispatch({
          type: constants.CATEGORIES_UPDATE,
          payload: {
            category,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.CATEGORIES_UPDATE_FAILURE,
          payload: {
            error: err,
          },
        })
      })
  }
}

export function deleteCategories({ ids }) {
  return (dispatch) => {
    dispatch({
      type: constants.CATEGORIES_DELETE,
      payload: {
        ids,
      },
    })
    api.categories.del({ ids }).end()
  }
}
