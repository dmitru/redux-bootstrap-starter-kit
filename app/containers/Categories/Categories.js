import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import { reset as resetForm } from 'redux-form'
import _ from 'lodash'
import { createSelector } from 'reselect'

import { getCategories, getSelectedCategories } from '../../reducers/categories'
import {
  fetchCategoriesIfNeeded,
  addCategory,
  updateCategory,
  toggleSelection,
  deleteCategories,
} from '../../actions/categories'
import Category from '../../components/Category'
import Loader from '../../components/Loader'
import PaginatedList from '../../components/PaginatedList'
import ListToolbar from '../../components/ListToolbar'
import EditCategoryForm from '../EditCategoryForm'
import AddCategoryForm from '../AddCategoryForm'

class Categories extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    categories: React.PropTypes.array,
    selectedCategories: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    notificationCenter: React.PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.handleEditModalSubmit = this.handleEditModalSubmit.bind(this)
    this.deleteCategories = this.deleteCategories.bind(this)
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

  handleAddCategory(values) {
    const { notificationCenter } = this.context
    const { dispatch } = this.props
    return new Promise((resolve, reject) => {
      const name = _.trim(values.name)
      if (_.isEmpty(name)) {
        reject({ name: 'A name is required', _error: 'Failed to add category' })
      } else {
        dispatch(addCategory({
          category: {
            name,
          },
        }))
        dispatch(resetForm('addCategory'))

        notificationCenter.addNotification({
          message: `Created category ${name}`,
          level: 'success',
          autoDismiss: 2,
          position: 'bl',
          dismissible: false,
        })
        resolve()
      }
    })
  }

  handleCategoryClick(entry) {
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

  handleEditModalSubmit({ category }) {
    const { dispatch } = this.props
    dispatch(updateCategory({ category }))
    this.closeEditModal()
  }

  deleteCategories() {
    const { dispatch, selectedCategories } = this.props
    const selectedCategoriesIds = _.map(selectedCategories, (e) => e.id)
    dispatch(deleteCategories({ ids: selectedCategoriesIds }))
    this.closeDeleteModal()

    const { notificationCenter } = this.context
    const notificationText = selectedCategoriesIds.length > 1 ?
      `Deleted ${selectedCategoriesIds.length} categories` :
      `Deleted category ${name}`
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
    const { categories, selectedCategories, dispatch } = this.props
    if (_.isEmpty(selectedCategories)) {
      const allIdsNotSaving = _.map(
        _.filter(categories, (e) => !e.isSaving),
        (e) => e.id
      )
      dispatch(toggleSelection({ ids: allIdsNotSaving }))
    } else {
      dispatch(toggleSelection({ ids: _.map(selectedCategories, (e) => e.id) }))
    }
  }

  fetchInitialDataIfNeeded() {
    const { dispatch } = this.props
    dispatch(fetchCategoriesIfNeeded())
  }

  render() {
    const { children, readyToShowUi, categories, selectedCategories } = this.props
    if (!readyToShowUi) {
      return <Loader />
    }

    const editModal = (
      <Modal show={this.state.showEditModal} onHide={this.closeEditModal}>
        <Modal.Body>
          <h4>Edit categories</h4>
        </Modal.Body>
        <Modal.Footer>
          <EditCategoryForm
            category={_.isEmpty(selectedCategories) ? null : selectedCategories[0]}
            categories={categories}
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
          <Button bsStyle="danger" onClick={this.deleteCategories}>Yes</Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <Row>
        <Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
          {editModal}
          {deleteModal}
          <AddCategoryForm onSubmit={this.handleAddCategory} />
          <div style={{ height: '40px', paddingTop: '15px' }}>
            <ListToolbar
              editButtonEnabled={selectedCategories.length === 1}
              deleteButtonEnabled={selectedCategories.length > 0}
              toggleSelectionEnabled={selectedCategories.length > 0}
              onEditClick={this.showEditModal}
              onDeleteClick={this.showDeleteModal}
              onToggleSelectionClick={this.toggleSelection}
            />
          </div>
          <div>
            <PaginatedList
              items={categories}
              itemRenderer={({ item }) => (
                <Category
                  {...item}
                  onClick={() => this.handleCategoryClick(item)}
                />
              )}
            />
          </div>
          <div style={{ marginTop: '15px' }}>Number of categories: {categories.length}</div>
          <div> {children} </div>
        </Col>
      </Row>
    )
  }
}

const categoriesViewSelector = createSelector(
  [getCategories],
  (categories) => (
    _.sortBy(categories, (c) => c.name.toLowerCase())
  )
)

const mapStateToProps = (state) => ({
  readyToShowUi: !_.isNull(getCategories(state)),
  categories: categoriesViewSelector(state),
  selectedCategories: getSelectedCategories(state),
})

export default connect(mapStateToProps)(Categories)
