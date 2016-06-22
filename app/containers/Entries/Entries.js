import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { reset as resetForm } from 'redux-form'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import _ from 'lodash'

import { getEntries, getSelectedEntriesIds } from '../../reducers/entries'
import { getCategories } from '../../reducers/categories'
import {
  fetchEntriesIfNeeded,
  addEntry,
  updateEntry,
  toggleSelection,
  deleteEntries,
} from '../../actions/entries'
import { fetchCategoriesIfNeeded } from '../../actions/categories'
import Entry from '../../components/Entry'
import Loader from '../../components/Loader'
import PaginatedList from '../../components/PaginatedList'
import ListToolbar from '../../components/ListToolbar'
import AddEntryForm from '../AddEntryForm'
import EditEntryForm from '../EditEntryForm'

class Entries extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    entries: React.PropTypes.array,
    selectedEntries: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    notificationCenter: React.PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.handleAddEntry = this.handleAddEntry.bind(this)
    this.handleEntryClick = this.handleEntryClick.bind(this)
    this.handleEditModalSubmit = this.handleEditModalSubmit.bind(this)
    this.deleteEntries = this.deleteEntries.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.toggleSelection = this.toggleSelection.bind(this)
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.showEditModal = this.showEditModal.bind(this)

    this.state = {
      showEditModal: false,
      showDeleteModal: false,
    }
  }

  componentWillMount() {
    this.fetchInitialDataIfNeeded()
  }

  handleAddEntry(values) {
    const { notificationCenter } = this.context
    const { dispatch } = this.props
    const { amount, isIncome, category } = values
    const amountParsed = parseFloat(_.replace(amount, ',', '.'))
    return new Promise((resolve, reject) => {
      if (_.isNaN(amountParsed)) {
        reject({ amount: 'Is required', _error: 'Failed to add entry' })
      } else {
        dispatch(addEntry({
          entry: {
            amount: amountParsed,
            type: isIncome ? 'i' : 'e',
            categoryId: category ? category[0].id : null,
            date: new Date(),
          },
        }))
        dispatch(resetForm('addEntry'))

        const notificationText = isIncome ?
          `An income of $${amountParsed} added` :
          `An expense of $${amountParsed} added`
        notificationCenter.addNotification({
          message: notificationText,
          level: 'success',
          autoDismiss: 2,
          position: 'bl',
          dismissible: false,
        })
      }
    })
  }

  handleEntryClick(entry) {
    if (entry.isSaving) {
      return
    }
    const { dispatch } = this.props
    dispatch(toggleSelection({ id: entry.id }))
  }

  showEditModal() {
    this.setState({ showEditModal: true })
  }

  closeEditModal() {
    this.setState({ showEditModal: false })
  }

  handleEditModalSubmit({ entry }) {
    const { dispatch } = this.props
    dispatch(updateEntry({ entry }))
    this.closeEditModal()
  }

  deleteEntries() {
    const { dispatch, selectedEntries } = this.props
    const selectedEntriesIds = _.map(selectedEntries, (e) => e.id)
    dispatch(deleteEntries({ ids: selectedEntriesIds }))
    this.closeDeleteModal()

    const { notificationCenter } = this.context
    const notificationText = selectedEntriesIds.length > 1 ?
      `Deleted ${selectedEntriesIds.length} entries` :
      'Deleted 1 entry'
    notificationCenter.addNotification({
      message: notificationText,
      level: 'success',
      autoDismiss: 2,
      position: 'bl',
      dismissible: false,
    })
  }

  showDeleteModal() {
    this.setState({ showDeleteModal: true })
  }

  closeDeleteModal() {
    this.setState({ showDeleteModal: false })
  }

  toggleSelection() {
    const { entries, selectedEntries, dispatch } = this.props
    if (_.isEmpty(selectedEntries)) {
      const allIdsNotSaving = _.map(
        _.filter(entries, (e) => !e.isSaving),
        (e) => e.id
      )
      dispatch(toggleSelection({ ids: allIdsNotSaving }))
    } else {
      dispatch(toggleSelection({ ids: _.map(selectedEntries, (e) => e.id) }))
    }
  }

  fetchInitialDataIfNeeded() {
    const { dispatch } = this.props
    dispatch(fetchEntriesIfNeeded())
    dispatch(fetchCategoriesIfNeeded())
  }

  render() {
    const { children, readyToShowUi, entries, selectedEntries } = this.props
    if (!readyToShowUi) {
      return <Loader />
    }

    const editModal = (
      <Modal show={this.state.showEditModal} onHide={this.closeEditModal}>
        <Modal.Body>
          <h4>Edit entries</h4>
        </Modal.Body>
        <Modal.Footer>
          <EditEntryForm
            entry={_.isEmpty(selectedEntries) ? null : selectedEntries[0]}
            onCancel={this.closeEditModal} onSubmit={this.handleEditModalSubmit}
          />
        </Modal.Footer>
      </Modal>
    )
    const deleteModal = (
      <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>
        <Modal.Body>
          <h4>Are you sure?</h4>
          This action is irreversible.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeDeleteModal} autoFocus>No</Button>
          <Button bsStyle="danger" onClick={this.deleteEntries}>Yes</Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <Row>
        <Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
          {editModal}
          {deleteModal}
          <AddEntryForm onSubmit={this.handleAddEntry} />
          <div style={{ height: '40px', paddingTop: '15px' }}>
            <ListToolbar
              editButtonEnabled={selectedEntries.length === 1}
              deleteButtonEnabled={selectedEntries.length > 0}
              toggleSelectionEnabled={selectedEntries.length > 0}
              onEditClick={this.showEditModal}
              onDeleteClick={this.showDeleteModal}
              onToggleSelectionClick={this.toggleSelection}
            />
          </div>
          <div>
            <PaginatedList
              items={entries}
              itemRenderer={({ item }) => (
                <Entry
                  {...item}
                  onClick={() => this.handleEntryClick(item)}
                />
              )}
            />
          </div>
          <div style={{ marginTop: '15px' }}>Number of entries: {entries.length}</div>
          <div> {children} </div>
        </Col>
      </Row>
    )
  }
}

const entriesViewSelector = createSelector(
  [getEntries, getCategories, getSelectedEntriesIds],
  (entries, categories, selectedEntriesIds) => {
    if (_.isNull(entries) || _.isNull(categories)) {
      return []
    }
    const entriesSorted = _.sortBy(entries, (e) => -(new Date(e.date).getTime()))
    return entriesSorted.map(e => {
      const isSelected = _.includes(selectedEntriesIds, e.id)
      const category = _.find(categories, c => c.id === e.categoryId)
      if (_.isUndefined(category)) {
        return { ...e, isSelected, category: null }
      }
      return { ...e, isSelected, category }
    })
  },
)

const getSelectedEntries = createSelector(
  [entriesViewSelector, getSelectedEntriesIds],
  (entries, selectedEntriesIds) => (
    _.map(selectedEntriesIds,
      (id) => _.find(entries, (e) => e.id === id))
  )
)

const mapStateToProps = (state) => ({
  readyToShowUi: !_.isNull(getCategories(state)) && !_.isNull(getEntries(state)),
  entries: entriesViewSelector(state),
  selectedEntries: getSelectedEntries(state),
})

export default connect(mapStateToProps)(Entries)
