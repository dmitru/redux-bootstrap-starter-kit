/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import { AutoSizer, VirtualScroll } from 'react-virtualized'

class ScrolledList extends React.Component {

  static propTypes = {
    items: React.PropTypes.array,
    itemRenderer: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.rowRenderer = this.rowRenderer.bind(this)
  }

  rowRenderer({ index, isScrolling }) {
    if (isScrolling) {
      return <span>Scrolling...</span>
    }
    const { items, itemRenderer } = this.props
    return itemRenderer({ item: items[index], index })
  }

  render() {
    const { items } = this.props
    const itemsNotEmpty = items.length > 0

    let content = []
    if (itemsNotEmpty) {
      content = (
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualScroll
              style={{ outlineWidth: '0px' }}
              entries={items}
              overscanRowCount={10}
              width={width}
              height={300}
              rowHeight={35}
              rowCount={items.length}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      )
    }
    return (
      <div>
        {itemsNotEmpty ? content : <span>No items to show.</span>}
      </div>
    )
  }
}

export default ScrolledList
