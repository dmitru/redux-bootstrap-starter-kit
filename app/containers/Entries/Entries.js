import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'

import { getEntries, getSelectedEntries } from '../../reducers/entries'
import { getCategories } from '../../reducers/categories'
import { fetchEntriesIfNeeded, addEntry, toggleSelection } from '../../actions/entries'
import { fetchCategoriesIfNeeded } from '../../actions/categories'
import Loader from '../../components/Loader'
import EntryList from '../../components/EntryList'
import AddEntryForm from '../AddEntryForm'

class Entries extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    entries: React.PropTypes.array,
    selectedEntriesIds: React.PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleAddEntry = this.handleAddEntry.bind(this)
    this.handleEntryClick = this.handleEntryClick.bind(this)
  }

  componentWillMount() {
    this.fetchInitialDataIfNeeded()
  }

  handleAddEntry(data) {
    const { dispatch } = this.props
    dispatch(addEntry({
      entry: {
        amount: parseFloat(data.amount),
        type: data.isIncome ? 'i' : 'e',
        categoryId: data.category[0].id,
        date: new Date(),
      },
    }))
  }

  handleEntryClick(entry) {
    if (entry.isSaving) {
      return
    }
    const { dispatch } = this.props
    dispatch(toggleSelection({ id: entry.id }))
  }

  fetchInitialDataIfNeeded() {
    const { dispatch } = this.props
    dispatch(fetchEntriesIfNeeded())
    dispatch(fetchCategoriesIfNeeded())
  }

  render() {
    const { children, readyToShowUi, entries, selectedEntriesIds } = this.props
    if (!readyToShowUi) {
      return <Loader />
    }
    const color = selectedEntriesIds.length > 0 ? '#337ab7' : '#ddd'
    const editButton = (
      <a href="#" style={{ fontWeight: 'bold', color }}>
        <Glyphicon glyph="edit" />&nbsp;EDIT
      </a>
    )
    const deleteButton = (
      <a href="#" style={{ marginLeft: '15px', fontWeight: 'bold', color }}>
        <Glyphicon glyph="trash" />&nbsp;DELETE
      </a>
    )
    console.log(selectedEntriesIds.length)
    const toolbarButtons = (
      <div>
        <div className="pull-right">
          {editButton}{deleteButton}
        </div>
      </div>
    )
    return (
      <Row>
        <Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
          <AddEntryForm onSubmit={this.handleAddEntry} />
          <div style={{ height: '35px' }}>
            {toolbarButtons}
          </div>
          <div>
            <EntryList entries={entries} onEntryClick={this.handleEntryClick} />
          </div>
          <div style={{ marginTop: '15px' }}>Number of entries: {entries.length}</div>
          <div> {children} </div>
        </Col>
      </Row>
    )
  }
}

const entriesViewSelector = createSelector(
  [getEntries, getCategories, getSelectedEntries],
  (entries, categories, selectedEntriesIds) => {
    if (_.isNull(entries) || _.isNull(categories)) {
      return []
    }
    const entriesSorted = _.sortBy(entries, (e) => -(new Date(e.date).getTime()))
    return entriesSorted.map(e => {
      const isSelected = _.includes(selectedEntriesIds, e.id)
      const category = categories.find(c => c.id === e.categoryId)
      if (_.isUndefined(category)) {
        return { ...e, isSelected }
      }
      return { ...e, isSelected, category: category.name }
    })
  },
)

const mapStateToProps = (state) => ({
  readyToShowUi: !_.isNull(getCategories(state)) && !_.isNull(getEntries(state)),
  entries: entriesViewSelector(state),
  selectedEntriesIds: getSelectedEntries(state),
})

export default connect(mapStateToProps)(Entries)
