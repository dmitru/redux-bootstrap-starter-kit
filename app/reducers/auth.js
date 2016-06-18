import { createSelector } from 'reselect'
import _ from 'lodash'

import * as constants from '../constants'
import cookie from '../utils/cookie'

const initialState = {
  isLoggingIn: false,
  isSigningUp: false,
  token: null,
  errorLogin: null,
  errorSignup: null,
}

const authToken = cookie.get('token')
if (authToken) {
  initialState.token = authToken
}

export const getAuthToken = (state) => state.auth.token
const getLoginError = (state) => state.auth.errorLogin
const getSignupError = (state) => state.auth.errorSignup
export const getIsLoggingIn = (state) => state.auth.isLoggingIn
export const getIsSigningUp = (state) => state.auth.isSigningUp

export const getIsAuthenticated = createSelector(
  [getAuthToken],
  (token) => !_.isNull(token)
)

export const getSignupErrorMessage = createSelector(
  [getSignupError],
  (error) => ((error && error.message) ? error.message : null)
)

export const getLoginErrorMessage = createSelector(
  [getLoginError],
  (error) => ((error && error.message) ? error.message : null)
)

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.AUTH_LOGIN_REQUEST:
      return { ...state, isLoggingIn: true }
    case constants.AUTH_SIGNUP_REQUEST:
      return { ...state, isSigningUp: true }
    case constants.AUTH_LOGGED_IN:
      return {
        ...state,
        token: payload.token,
        isLoggingIn: false, isSigningUp: false,
        errorLogin: false, errorSignup: false,
      }
    case constants.AUTH_LOGGED_OUT:
      return { ...initialState, token: null }
    case constants.AUTH_LOGIN_ERROR:
      return { ...state, errorLogin: payload, isLoggingIn: false }
    case constants.AUTH_SIGNUP_ERROR:
      return { ...state, errorSignup: payload, isSigningUp: false }
    default:
      return state
  }
}

