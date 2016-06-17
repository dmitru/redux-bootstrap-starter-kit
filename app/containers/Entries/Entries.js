import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Row, Col, Glyphicon, Modal, Button } from 'react-bootstrap'
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
import Loader from '../../components/Loader'
import EntryList from '../../components/EntryList'
import AddEntryForm from '../AddEntryForm'
import EditEntryForm from '../EditEntryForm'

class Entries extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    entries: React.PropTypes.array,
    selectedEntries: React.PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleAddEntry = this.handleAddEntry.bind(this)
    this.handleEntryClick = this.handleEntryClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleEditModalSubmit = this.handleEditModalSubmit.bind(this)
    this.deleteEntries = this.deleteEntries.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.toggleSelection = this.toggleSelection.bind(this)

    this.state = {
      showEditModal: false,
      showDeleteModal: false,
    }
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

  handleEditClick(e) {
    e.preventDefault()
    this.showEditModal()
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
  }

  handleDeleteClick(e) {
    e.preventDefault()
    this.showDeleteModal()
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
    const styles = {
      activeToolbarLink: { fontWeight: 'bold', color: '#337ab7', transition: 'all 0.3s ease' },
      inactiveToolbarLink: { fontWeight: 'bold', color: '#ccc', transition: 'all 0.3s ease' },
    }
    const { children, readyToShowUi, entries, selectedEntries } = this.props
    if (!readyToShowUi) {
      return <Loader />
    }
    const editButtonEnabled = selectedEntries.length === 1
    const deleteButtonEnabled = selectedEntries.length > 0
    const editButton = (
      <a
        href="#"
        onClick={editButtonEnabled ? this.handleEditClick : null}
        style={editButtonEnabled ? styles.activeToolbarLink : styles.inactiveToolbarLink} key="1"
      >
        <Glyphicon glyph="edit" />&nbsp;EDIT
      </a>
    )
    const deleteButton = (
      <a
        href="#"
        onClick={deleteButtonEnabled ? this.handleDeleteClick : null}
        style={{
          ...(deleteButtonEnabled ? styles.activeToolbarLink : styles.inactiveToolbarLink),
          marginLeft: '15px',
        }}
        key="2"
      >
        <Glyphicon glyph="trash" />&nbsp;DELETE
      </a>
    )
    const toggleSelectionButton = (
      <a
        href="#"
        onClick={this.toggleSelection}
        style={selectedEntries.length > 0 ? styles.activeToolbarLink : styles.inactiveToolbarLink}
        key="3"
      >
        {selectedEntries.length > 0 ? 'CLEAR' : 'ALL'}
      </a>
    )
    const toolbarButtons = (
      <div>
        {toggleSelectionButton}
        <div className="pull-right">
          {editButton}{deleteButton}
        </div>
      </div>
    )

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
        return { ...e, isSelected }
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
