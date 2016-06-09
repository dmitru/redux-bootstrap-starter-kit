import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'

import { getEntries } from '../../reducers/entries'
import { getCategories } from '../../reducers/categories'
import { fetchEntriesIfNeeded } from '../../actions/entries'
import { fetchCategoriesIfNeeded } from '../../actions/categories'
import Loader from '../../components/Loader'
import EntryList from '../../components/EntryList'

class Entries extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    entries: React.PropTypes.array,
  }

  componentWillMount() {
    this.fetchInitialDataIfNeeded()
  }

  fetchInitialDataIfNeeded() {
    const { dispatch } = this.props
    dispatch(fetchEntriesIfNeeded())
    dispatch(fetchCategoriesIfNeeded())
  }

  render() {
    const { children, readyToShowUi, entries } = this.props
    if (!readyToShowUi) {
      return <Loader />
    }
    return (
      <div>
        <h2>Entries</h2>
        <EntryList entries={entries} />
          Number of entries: {entries.length}
        <div> {children} </div>
      </div>
    )
  }
}

const entriesViewSelector = createSelector(
  [getEntries, getCategories],
  (entries, categories) => {
    if (_.isNull(entries) || _.isNull(categories)) {
      return []
    }
    return entries.map(e => {
      const category = categories.find(c => c.id === e.categoryId)
      if (_.isUndefined(category)) {
        return { ...e }
      }
      return { ...e, category: category.name }
    })
  }
)

const mapStateToProps = (state) => ({
  readyToShowUi: !_.isNull(getCategories(state)) && !_.isNull(getEntries(state)),
  entries: entriesViewSelector(state),
})

export default connect(mapStateToProps)(Entries)
