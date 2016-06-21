
import _ from 'lodash'
import { createSelector } from 'reselect'
import * as constants from '../constants'

const initialState = {
  isLoading: false,
  error: null,
  items: null,
  selectedItems: [],
}

export default function categoriesUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.CATEGORIES_FETCH_REQUEST:
      return { ...state, isLoading: true }
    case constants.CATEGORIES_FETCH_SUCCESS:
      return { ...state, isLoading: false, items: payload }
    case constants.CATEGORIES_FETCH_FAILURE:
      return { ...state, error: payload }
    case constants.CATEGORIES_ADD_REQUEST:
      return { ...state, items: [...state.items, payload.category] }
    case constants.CATEGORIES_ADD_SUCCESS: {
      const newCategories = _.map(state.items,
        (item) => {
          if (item.id === payload.temporaryId) {
            return payload.category
          }
          return item
        })
      return { ...state, items: newCategories }
    }
    case constants.CATEGORIES_UPDATE: {
      const updatedCategory = payload.category
      const newCategories = _.map(state.items, (e) => (
        e.id === updatedCategory.id ? updatedCategory : e
      ))
      return { ...state, items: newCategories }
    }
    case constants.CATEGORIES_DELETE: {
      const newCategories = _.filter(state.items, (e) => (
        !_.includes(payload.ids, e.id)
      ))
      return { ...state, items: newCategories, selectedItems: [] }
    }
    case constants.CATEGORIES_TOGGLE_SELECTION: {
      const selectedToToggle = _.intersection(state.selectedItems, payload.ids)
      const unselectedToToggle = _.difference(payload.ids, selectedToToggle)
      const newSelectedItems = _.union(unselectedToToggle,
        _.difference(state.selectedItems, selectedToToggle))
      return { ...state, selectedItems: newSelectedItems }
    }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState }
    default:
      return state
  }
}

const categoriesSelector = (state) => state.categories.items
export const getSelectedCategoriesIds = (state) => state.categories.selectedItems

export const getCategories = createSelector(
  [categoriesSelector, getSelectedCategoriesIds],
  (items, selectedIds) => (
    _.map(items, (item) => {
      if (_.includes(selectedIds, item.id)) {
        return { ...item, isSelected: true }
      }
      return { ...item, isSelected: false }
    })
  )
)

export const getSelectedCategories = createSelector(
  [getCategories, getSelectedCategoriesIds],
  (items, selectedIds) => (
    _.map(selectedIds,
      (id) => _.find(items, (i) => i.id === id))
  )
)

