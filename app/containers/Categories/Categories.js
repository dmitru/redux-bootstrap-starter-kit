import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import _ from 'lodash'

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
import ScrolledList from '../../components/ScrolledList'
import ListToolbar from '../../components/ListToolbar'

class Categories extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    categories: React.PropTypes.array,
    selectedCategories: React.PropTypes.array.isRequired,
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

  handleAddCategory(data) {
    const { dispatch } = this.props
    dispatch(addCategory({
      entry: {
        amount: parseFloat(data.amount),
        type: data.isIncome ? 'i' : 'e',
        categoryId: data.category[0].id,
        date: new Date(),
      },
    }))
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

  handleEditModalSubmit({ entry }) {
    const { dispatch } = this.props
    dispatch(updateCategory({ entry }))
    this.closeEditModal()
  }

  deleteCategories() {
    const { dispatch, selectedCategories } = this.props
    const selectedCategoriesIds = _.map(selectedCategories, (e) => e.id)
    dispatch(deleteCategories({ ids: selectedCategoriesIds }))
    this.closeDeleteModal()
  }

  showDeleteModal() {
    console.log('delete modal')
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
          TODO
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
            <ScrolledList
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

const mapStateToProps = (state) => ({
  readyToShowUi: !_.isNull(getCategories(state)),
  categories: getCategories(state),
  selectedCategories: getSelectedCategories(state),
})

export default connect(mapStateToProps)(Categories)
