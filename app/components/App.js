import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchUserProfile } from '../actions/profile'
import { fetchEntries } from '../actions/entries'
import { fetchCategories } from '../actions/categories'
import Layout from './Layout'
import Loader from './Loader'

class App extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    auth: React.PropTypes.object.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    profile: React.PropTypes.object.isRequired,
    entries: React.PropTypes.object.isRequired,
    categories: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.fetchInitialDataIfNeeded(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchInitialDataIfNeeded(nextProps)
  }

  fetchInitialDataIfNeeded(props) {
    const { isAuthenticated, auth, profile, entries, categories, dispatch } = props
    if (!isAuthenticated) {
      return
    }

    if (_.isEmpty(profile.user) && !profile.isLoading) {
      dispatch(fetchUserProfile({ token: auth.token }))
    }

    if (_.isNull(entries.items) && !entries.isLoading) {
      dispatch(fetchEntries())
    }

    if (_.isNull(categories.items) && !categories.isLoading) {
      dispatch(fetchCategories())
    }
  }

  render() {
    const { profile: { user }, children, isAuthenticated } = this.props
    const readyToShowUi = !isAuthenticated ? true : !_.isNull(user)
    return (
      <Layout>
        <div> {readyToShowUi ? children : <Loader />} </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: !_.isNull(state.auth.token),
  profile: state.profile,
  entries: state.entries,
  categories: state.categories,
})

export default connect(mapStateToProps)(App)
