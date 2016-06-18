
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { getIsAuthenticated } from './reducers/auth'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state,
  predicate: (state) => getIsAuthenticated(state),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
})
