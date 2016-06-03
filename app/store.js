import { syncHistoryWithStore, routerReducer, routerActions } from 'react-router-redux'

import thunk from 'redux-thunk'
import R from 'ramda'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import reducers from './reducers'


const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer,
})

export const logStateMiddleware = ({ getState }) => next => action => {
  console.log(action.type, getState())
  next(action)
}

export const store = createStore(reducer, R.compose(
  applyMiddleware(logStateMiddleware, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const history = syncHistoryWithStore(browserHistory, store)

export default store
