import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Col } from 'react-bootstrap'
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
        <Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
          <h2>Entries</h2>
          <div style={{ height: '100px' }}>
            TODO: New entry form
          </div>
          <EntryList entries={entries} style={{ marginTop: '20px' }} />
          <div style={{ marginTop: '15px' }}>Number of entries: {entries.length}</div>
          <div> {children} </div>
        </Col>
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
