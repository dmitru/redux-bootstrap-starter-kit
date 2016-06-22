/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import _ from 'lodash'
import { Pagination } from 'react-bootstrap'

class ScrolledList extends React.Component {

  static propTypes = {
    items: React.PropTypes.array,
    itemRenderer: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this)
    const { items } = props
    const numPages = Math.floor((items.length - 1) / 10) + 1
    this.state = {
      itemsPerPage: 10,
      curPage: Math.min(1, numPages),
      pages: numPages,
    }
  }

  componentWillReceiveProps(props) {
    this.updatePaginationState(props)
  }

  updatePaginationState(props) {
    const { items } = props
    const { itemsPerPage, curPage } = this.state
    const newNumPages = Math.floor((items.length - 1) / itemsPerPage) + 1
    const newCurPage = Math.min(Math.max(1, curPage), newNumPages)
    this.setState({
      pages: newNumPages,
      curPage: newCurPage,
    })
  }

  handlePaginationSelect(eventKey) {
    this.setState({
      curPage: eventKey,
    })
  }

  render() {
    const { items, itemRenderer } = this.props
    const { pages, itemsPerPage, curPage } = this.state
    const itemsNotEmpty = items.length > 0

    const visibleItems = _.slice(items,
      itemsPerPage * (curPage - 1),
      Math.min(items.length, itemsPerPage * curPage)
    )
    const content = _.map(visibleItems, (item, id) => (
      <div key={id}>
        {itemRenderer({ item })}
      </div>
    ))
    return (
      <div style={{ textAlign: 'center' }}>
        {itemsNotEmpty ? content : <span>No items to show.</span>}
        {pages > 1 ?
          <Pagination
            items={pages} activePage={curPage}
            onSelect={this.handlePaginationSelect}
            boundaryLinks
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={4}
          /> : null
        }
      </div>
    )
  }
}

export default ScrolledList
