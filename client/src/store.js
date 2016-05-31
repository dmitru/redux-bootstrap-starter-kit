import { syncHistory, routeReducer } from 'react-router-redux'

import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers  } from 'redux'
import { reducer as formReducer } from 'redux-form';
import createHistory from 'history/lib/createBrowserHistory'

// Opt-out of persistent state, not recommended.
// http://rackt.org/history/stable/HashHistoryCaveats.html
export const history = createHistory({
    queryKey: false
});
    
//const reducer = combineReducers3(Object.assign({}, { 
const reducer = combineReducers(Object.assign({}, { 

    }, {
        routing: routeReducer
    }, {
        form: formReducer     
    })
)

const reduxRouterMiddleware = syncHistory(history)

const logStateMiddleware = ({dispatch, getState}) => next => action => {
    console.log(action.type, getState())
    next(action)
}

const store = createStore(reducer, applyMiddleware(
    thunk, reduxRouterMiddleware
));

export default store
