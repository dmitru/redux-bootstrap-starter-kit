
import cookie from './utils/cookie'
import apiClient from './utils/apiClient'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { getIsAuthenticated } from './reducers/auth'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state,
  predicate: (state) => getIsAuthenticated(state),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
})

const authToken = cookie.get('token')
if (authToken) {
  apiClient.set('Authorization', authToken)
}
