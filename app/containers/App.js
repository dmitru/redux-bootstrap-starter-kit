import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import NotificationSystem from 'react-notification-system'

import { getIsAuthenticated } from '../reducers/auth'
import { getUserProfile } from '../reducers/profile'
import { fetchUserProfileIfNeeded } from '../actions/profile'
import { fetchEntriesIfNeeded } from '../actions/entries'
import { fetchCategoriesIfNeeded } from '../actions/categories'
import Layout from './Layout'
import Loader from '../components/Loader'

class App extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
  }

  static childContextTypes = {
    notificationCenter: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.notificationCenter = null
  }

  getChildContext() {
    return { notificationCenter: this.notificationCenter }
  }

  componentWillMount() {
    this.fetchInitialDataIfNeeded(this.props)
  }

  componentWillReceiveProps(props) {
    this.fetchInitialDataIfNeeded(props)
  }

  fetchInitialDataIfNeeded(props) {
    const { isAuthenticated, dispatch } = props
    if (!isAuthenticated) {
      return
    }
    dispatch(fetchUserProfileIfNeeded())
    dispatch(fetchEntriesIfNeeded())
    dispatch(fetchCategoriesIfNeeded())
  }

  render() {
    const { children, readyToShowUi } = this.props
    return (
      <Layout>
        <NotificationSystem ref={(c) => { this.notificationCenter = c }} />
        <div> {readyToShowUi ? children : <Loader />} </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const isAuthenticated = getIsAuthenticated(state)
  return {
    readyToShowUi: isAuthenticated ? !_.isNull(getUserProfile(state)) : true,
    isAuthenticated,
  }
}

export default connect(mapStateToProps)(App)
