import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchCategoriesIfNeeded } from '../../actions/categories'
import { getCategories } from '../../reducers/categories'
import Loader from '../../components/Loader'

class Categories extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    readyToShowUi: React.PropTypes.bool.isRequired,
    categories: React.PropTypes.array,
  }

  componentWillMount() {
    this.fetchInitialDataIfNeeded()
  }

  fetchInitialDataIfNeeded() {
    const { dispatch } = this.props
    dispatch(fetchCategoriesIfNeeded())
  }

  render() {
    const { children, readyToShowUi, categories } = this.props
    if (!readyToShowUi) {
      return <Loader />
    }
    return (
      <div>
        <h2>Categories</h2>
        Number of categories: {categories.length}
        <div> {children} </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  readyToShowUi: !_.isNull(getCategories(state)),
  categories: getCategories(state),
})

export default connect(mapStateToProps)(Categories)
