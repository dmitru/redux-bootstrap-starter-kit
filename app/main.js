import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import { store, history, UserIsAuthenticated } from './store'
import App from './containers/App'
import Login from './containers/Login'
import Entries from './containers/Entries'
import Categories from './containers/Categories'
import About from './components/About'
import { logout } from './actions/auth/auth'

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
