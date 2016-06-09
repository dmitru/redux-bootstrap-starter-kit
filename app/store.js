import {
  syncHistoryWithStore,
  routerReducer,
  routerMiddleware,
  routerActions,
} from 'react-router-redux'

import thunk from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import { getIsAuthenticated } from './reducers/auth'
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

const routingMiddleware = routerMiddleware(browserHistory)
const storeEnhancer = compose(
  applyMiddleware(logStateMiddleware, thunk),
  applyMiddleware(routingMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export const store = createStore(reducer, storeEnhancer)

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state,
  predicate: (state) => getIsAuthenticated(state),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const history = syncHistoryWithStore(browserHistory, store)


export default store
