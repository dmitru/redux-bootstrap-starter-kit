

import thunk from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers  } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


const reducers = {

}

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
    form: formReducer
})

export const logStateMiddleware = ({dispatch, getState}) => next => action => {
    console.log(action.type, getState())
    next(action)
}

const store = createStore(reducer,
    applyMiddleware(
        logStateMiddleware, thunk
    )
)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
