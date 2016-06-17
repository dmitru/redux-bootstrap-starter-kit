
import _ from 'lodash'
import * as constants from '../constants'

const initialState = {
  isLoading: false,
  items: null,
  error: null,
  selectedItems: [],
}

export default function entriesUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.ENTRIES_FETCH_REQUEST:
      return { ...state, isLoading: true }
    case constants.ENTRIES_FETCH_SUCCESS:
      return { ...state, isLoading: false, items: payload }
    case constants.ENTRIES_FETCH_FAILURE:
      return { ...state, error: payload }
    case constants.ENTRIES_ADD_REQUEST:
      return { ...state, items: [...state.items, payload.entry] }
    case constants.ENTRIES_ADD_SUCCESS: {
      const newEntries = _.map(state.items,
        (item) => {
          if (item.id === payload.temporaryId) {
            return payload.entry
          }
          return item
        })
      return { ...state, items: newEntries }
    }
    case constants.ENTRIES_UPDATE: {
      const updatedEntry = payload.entry
      const newEntries = _.map(state.items, (e) => (
        e.id === updatedEntry.id ? updatedEntry : e
      ))
      return { ...state, items: newEntries }
    }
    case constants.ENTRIES_DELETE: {
      const newEntries = _.filter(state.items, (e) => (
        !_.includes(payload.ids, e.id)
      ))
      return { ...state, items: newEntries, selectedItems: [] }
    }
    case constants.ENTRIES_TOGGLE_SELECTION: {
      const newSelectedItems =
        (_.includes(state.selectedItems, payload.id)) ?
          _.filter(state.selectedItems, (id) => id !== payload.id)
          : [...state.selectedItems, payload.id]
      return { ...state, selectedItems: newSelectedItems }
    }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState }
    default:
      return state
  }
}

export const getEntries = (state) => state.entries.items
export const getSelectedEntriesIds = (state) => state.entries.selectedItems
