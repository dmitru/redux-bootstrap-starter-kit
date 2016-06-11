import { createSelector } from 'reselect'
import _ from 'lodash'

import * as constants from '../constants'
import cookie from '../utils/cookie'

const initialState = {
  isAuthenticating: false,
  isSigningUp: false,
  token: null,
  error: null,
}

const authToken = cookie.get('token')
if (authToken) {
  initialState.token = authToken
}

export const getAuthToken = (state) => state.auth.token
const getAuthError = (state) => state.auth.error
export const getIsAuthenticating = (state) => state.auth.isAuthenticating
export const getIsSigningUp = (state) => state.auth.isSigningUp

export const getIsAuthenticated = createSelector(
  [getAuthToken],
  (token) => !_.isNull(token)
)

export const getAuthErrorMessage = createSelector(
  [getAuthError],
  (error) => ((error && error.message) ? error.message : null)
)

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.AUTH_LOGIN_REQUEST:
      return { ...state, isAuthenticating: true }
    case constants.AUTH_SIGNUP_REQUEST:
      return { ...state, isSigningUp: true }
    case constants.AUTH_LOGGED_IN:
      return { ...state, token: payload.token, isAuthenticating: false, isSigningUp: false }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState, token: null }
    case constants.AUTH_LOGIN_ERROR:
      return { ...state, error: payload, isAuthenticating: false }
    case constants.AUTH_SIGNUP_ERROR:
      return { ...state, error: payload, isSigningUp: false }
    default:
      return state
  }
}

