import _ from 'lodash'

import * as constants from '../constants'
import api from '../api'


export function fetchEntries() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState()
    dispatch({ type: constants.ENTRIES_FETCH_REQUEST })
    api.entries.getAll({ token })
      .then((res) => {
        const data = res.data
        dispatch({
          type: constants.ENTRIES_FETCH_SUCCESS,
          payload: data,
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.ENTRIES_FETCH_FAILURE,
          payload: err.data,
        })
      })
  }
}


export function fetchEntriesIfNeeded() {
  return (dispatch, getState) => {
    const { entries } = getState()
    if (_.isNull(entries.items) && !entries.isLoading) {
      dispatch(fetchEntries())
    }
  }
}

export function addEntry({ entry }) {
  return (dispatch) => {
    // Optimistically add the new entry to the list of entries
    // Generate temporary id for the entry, which later will be replaced with real id
    // when the server returns response
    const temporaryId = `tmp_id_${(new Date).getTime()}_${Math.random() * 100000000}`
    dispatch({
      type: constants.ENTRIES_ADD_REQUEST,
      payload: {
        entry: {
          ...entry,
          id: temporaryId,
          isSaving: true,
        },
      },
    })

    // Simulate server-side delay
    setTimeout(() => {
      const id = Math.random() * 100000000
      dispatch({
        type: constants.ENTRIES_ADD_SUCCESS,
        payload: {
          temporaryId,
          entry: {
            ...entry,
            id,
          },
        },
      })
    }, 1000)
  }
}

export function toggleSelection({ id }) {
  return {
    type: constants.ENTRIES_TOGGLE_SELECTION,
    payload: {
      id,
    },
  }
}
