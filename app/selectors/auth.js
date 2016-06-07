import { createSelector } from 'reselect'
import _ from 'lodash'

const getAuthToken = (state) => state.auth.token

export const getIsAuthenticated = createSelector(
  [getAuthToken],
  (token) => !_.isNull(token)
)

