import _ from 'lodash'

import * as constants from '../constants'
import api from '../api'


export function fetchEntries() {
  return (dispatch) => {
    dispatch({ type: constants.ENTRIES_FETCH_REQUEST })
    api.entries.getAll()
      .then((res) => {
        const data = res.body
        dispatch({
          type: constants.ENTRIES_FETCH_SUCCESS,
          payload: data,
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.ENTRIES_FETCH_FAILURE,
          payload: err,
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

    api.entries.create({ entry })
      .then((res) => {
        dispatch({
          type: constants.ENTRIES_ADD_SUCCESS,
          payload: {
            temporaryId,
            entry: res.body,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.ENTRIES_ADD_FAILURE,
          payload: {
            temporaryId,
            error: err,
          },
        })
      })
  }
}

export function toggleSelection({ id, ids }) {
  if (!_.isUndefined(ids)) {
    return {
      type: constants.ENTRIES_TOGGLE_SELECTION,
      payload: {
        ids,
      },
    }
  }
  return {
    type: constants.ENTRIES_TOGGLE_SELECTION,
    payload: {
      ids: [id],
    },
  }
}

export function updateEntry({ entry }) {
  return (dispatch) => {
    dispatch({
      type: constants.ENTRIES_UPDATE,
      payload: {
        entry: {
          ...entry,
          isSaving: true,
        },
      },
    })

    api.entries.update({ entry })
      .then(() => {
        dispatch({
          type: constants.ENTRIES_UPDATE,
          payload: {
            entry,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.ENTRIES_UPDATE_FAILURE,
          payload: {
            error: err,
          },
        })
      })
  }
}

export function deleteEntries({ ids }) {
  return (dispatch) => {
    dispatch({
      type: constants.ENTRIES_DELETE,
      payload: {
        ids,
      },
    })
    api.entries.del({ ids }).end()
  }
}
