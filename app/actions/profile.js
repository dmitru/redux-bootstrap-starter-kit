
import _ from 'lodash'

import * as constants from '../constants'
import api from '../api'


export function fetchUserProfile() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState()
    dispatch({
      type: constants.PROFILE_FETCH_REQUEST,
    })
    api.profile.getProfile({ token })
      .then((res) => {
        const data = res.data
        dispatch({
          type: constants.PROFILE_FETCH_SUCCESS,
          payload: data,
        })
      })
      .catch((err) => {
        dispatch({
          type: constants.PROFILE_FETCH_FAILURE,
          payload: err.data,
        })
      })
  }
}

export function fetchUserProfileIfNeeded() {
  return (dispatch, getState) => {
    const { profile } = getState()
    if (_.isEmpty(profile.user) && !profile.isLoading) {
      dispatch(fetchUserProfile())
    }
  }
}
