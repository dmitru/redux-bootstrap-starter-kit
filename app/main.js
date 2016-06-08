import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import { store, history, UserIsAuthenticated } from './store'
import App from './components/App'
import Login from './components/Login'
import Entries from './components/Entries'
import Categories from './components/Categories'
import { logout } from './actions/auth/auth'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const NoMatch = () => (
  <div>
    <h2>No match</h2>
  </div>
)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={UserIsAuthenticated(Entries)} />
        <Route path="login" component={Login} />
        <Route path="about" component={About} />
        <Route path="" component={UserIsAuthenticated(Entries)} />
        <Route path="categories" component={UserIsAuthenticated(Categories)} />
        <Route path="*" component={NoMatch} />
      </Route>
      <button onClick={() => logout()}>Logout</button>
    </Router>
  </Provider>, document.getElementById('app-container')
)
