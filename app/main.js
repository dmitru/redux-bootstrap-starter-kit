import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'

import { Provider } from 'react-redux'
import { Button } from 'react-bootstrap'

import { store, history, UserIsAuthenticated } from './store'
import App from './components/App'
import Login from './components/Login'

import { logout } from './actions/user'

const About = () => {
    return (
        <div>
            <h2>About</h2>
        </div>)
}

const Entries = () => {
    return (
        <div>
            <h2>Entries</h2>
        </div>)
}

const Categories = () => {
    return (
        <div>
            <h2>Categories</h2>
        </div>)
}

const NoMatch = () => {
    return (
        <div>
            <h2>No match</h2>
            <Link to="/"><Button bsStyle="primary">Home</Button></Link>
        </div>)
}

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Entries}/>
                <Route path="" component={Entries}/>
                <Route path="login" component={Login}/>
                <Route path="categories" component={UserIsAuthenticated(Categories)}/>
                <Route path="about" component={About}/>
                <Route path="*" component={NoMatch}/>
            </Route>
            <button onClick={() => logout()}>Logout</button>
        </Router>
    </Provider>
), document.getElementById('app-container')
)



