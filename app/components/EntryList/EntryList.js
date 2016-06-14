/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import { AutoSizer, VirtualScroll } from 'react-virtualized'

import Entry from '../Entry'

class EntryList extends React.Component {

  static propTypes = {
    entries: React.PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.rowRenderer = this.rowRenderer.bind(this)
  }

  rowRenderer({ index, isScrolling }) {
    if (isScrolling) {
      return <span>Scrolling...</span>
    }
    const { entries } = this.props
    return <Entry {...entries[index]} />
  }

  render() {
    const { entries } = this.props
    const entriesNotEmpty = entries.length > 0

    let content = []
    if (entriesNotEmpty) {
      content = (
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualScroll
              entries={entries}
              overscanRowCount={10}
              width={width}
              height={300}
              rowHeight={40}
              rowCount={entries.length}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      )
    }
    return (
      <div>
        {entriesNotEmpty ? content : <span>No items to show.</span>}
      </div>
    )
  }
}

export default EntryList
