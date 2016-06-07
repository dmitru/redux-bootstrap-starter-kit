import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchCategories } from '../../actions/categories'
import Loader from '../Loader'

class Categories extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    categories: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.fetchInitialDataIfNeeded(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchInitialDataIfNeeded(nextProps)
  }

  fetchInitialDataIfNeeded(props) {
    const { dispatch, categories } = props

    if (_.isNull(categories.items) && !categories.isLoading) {
      dispatch(fetchCategories())
    }
  }

  render() {
    const { categories, children } = this.props
    const readyToShowUi = !_.isNull(categories.items)
    if (!readyToShowUi) {
      return <Loader />
    }
    return (
      <div>
        <h2>Categories</h2>
        Number of categories: {categories.items.length}
        <div> {children} </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

export default connect(mapStateToProps)(Categories)
