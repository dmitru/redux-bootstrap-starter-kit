import { routerActions } from 'react-router-redux'

import * as constants from '../../constants'
import api from '../../api'

import cookie from '../../utils/cookie'


const saveAuthToken = (token) => {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  cookie.set({
    name: 'token',
    value: token,
    expires,
  })
}

export function login({ email, password, saveToken = true }) {
  return (dispatch) => {
    dispatch({
      type: constants.AUTH_LOGIN_REQUEST,
    })
    return api.auth.login({ email, password })
      .then((res) => {
        const data = res.data
        if (saveToken) {
          saveAuthToken(data.token)
        }
        dispatch({
          type: constants.AUTH_LOGGED_IN,
          payload: data,
        })
      })
      .catch((err) => {
        let errorData = undefined
        if (err instanceof Error) {
          console.log(err)
          errorData = {
            errorCode: constants.ERROR_CLIENT,
            message: 'Error while making request to the server',
          }
        } else {
          errorData = {
            errorCode: err.data && err.data.errorCode ? err.data.errorCode : constants.ERROR_SERVER,
            status: err.status ? err.status : 500,
            message: err.data && err.data.message ? err.data.message : 'Server error',
          }
        }
        dispatch({
          type: constants.AUTH_LOGIN_ERROR,
          payload: errorData,
        })
      })
  }
}

export function signup({ email, password, captchaResponse, saveToken = true }) {
  return (dispatch) => {
    dispatch({
      type: constants.AUTH_SIGNUP_REQUEST,
    })
    return api.auth.signup({ email, password, captchaResponse })
      .then((res) => {
        const data = res.data
        if (saveToken) {
          saveAuthToken(data.token)
        }
        dispatch({
          type: constants.AUTH_LOGGED_IN,
          payload: data,
        })
      })
      .catch((err) => {
        let errorData = undefined
        if (err instanceof Error) {
          console.log(err)
          errorData = {
            errorCode: constants.ERROR_CLIENT,
            message: 'Error while making request to the server',
          }
        } else {
          errorData = {
            errorCode: err.data && err.data.errorCode ? err.data.errorCode : constants.ERROR_SERVER,
            status: err.status ? err.status : 500,
            message: err.data && err.data.message ? err.data.message : 'Server error',
          }
        }
        dispatch({
          type: constants.AUTH_SIGNUP_ERROR,
          payload: errorData,
        })
      })
  }
}

export function logout() {
  return (dispatch) => {
    cookie.unset('token')
    dispatch({ type: constants.AUTH_LOGGED_OUT })
    dispatch(routerActions.replace('/login'))
  }
}
