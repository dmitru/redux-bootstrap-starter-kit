import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'

import { Provider } from 'react-redux'
import { Button } from 'react-bootstrap'

import store from './store'
import { history } from './store'

import App from './components/App';

const About = () => {
    return (
        <div>
            <h2>About</h2>
            <Link to="/"><Button bsStyle="primary">Home</Button></Link>
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
                <Route path="/about" component={About}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app-container')
)



