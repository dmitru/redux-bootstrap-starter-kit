import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchEntries } from '../../actions/entries'
import { fetchCategories } from '../../actions/categories'
import Loader from '../../components/Loader'

class Entries extends Component {
  static propTypes = {
    children: React.PropTypes.element,
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
    const { dispatch, entries, categories } = props

    if (_.isNull(entries.items) && !entries.isLoading) {
      dispatch(fetchEntries())
    }

    if (_.isNull(categories.items) && !categories.isLoading) {
      dispatch(fetchCategories())
    }
  }

  render() {
    const { entries, categories, children } = this.props
    const readyToShowUi = !_.isNull(entries.items) && !_.isNull(categories.items)
    if (!readyToShowUi) {
      return <Loader />
    }
    return (
      <div>
        <h2>Entries</h2>
        Number of entries: {entries.items.length}
        <div> {children} </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  entries: state.entries,
  categories: state.categories,
})

export default connect(mapStateToProps)(Entries)
