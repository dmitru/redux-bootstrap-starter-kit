import { createSelector } from 'reselect'
import _ from 'lodash'

const getAuthToken = (state) => state.auth.token
const getAuthError = (state) => state.auth.error

export const getIsAuthenticated = createSelector(
  [getAuthToken],
  (token) => !_.isNull(token)
)

export const getAuthErrorMessage = createSelector(
  [getAuthError],
  (error) => ((error && error.message) ? error.message : null)
)
