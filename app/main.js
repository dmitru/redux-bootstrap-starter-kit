import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { Provider } from 'react-redux'
import { Button } from 'react-bootstrap'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import { store, history } from './store'
import App from './components/App'
import Login from './components/Login'
import Layout from './components/Layout'
import { logout } from './actions/user'

const About = () => (
  <Layout>
    <h2>About</h2>
  </Layout>
)

const Entries = () => (
  <div>
    <h2>Entries</h2>
  </div>
)

const Categories = () => (
  <div>
    <h2>Categories</h2>
  </div>
)

const NoMatch = () => (
  <div>
    <h2>No match</h2>
    <Link to="/"><Button bsStyle="primary">Home</Button></Link>
  </div>
)

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
})

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Route path="/" component={UserIsAuthenticated(App)}>
        <IndexRoute component={Entries} />
        <Route path="" component={Entries} />
        <Route path="categories" component={Categories} />
        <Route path="*" component={NoMatch} />
      </Route>
      <button onClick={() => logout()}>Logout</button>
    </Router>
  </Provider>, document.getElementById('app-container')
)
