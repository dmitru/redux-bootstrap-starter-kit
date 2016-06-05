import * as constants from '../constants'

import api from '../api'


export function fetchUserProfile({ token }) {
  return (dispatch) => {
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

