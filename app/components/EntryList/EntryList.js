/**
 * Created by dmitru on 6/5/16.
 */

import _ from 'lodash'
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
    this.state = {
      data: this.prepareData(this.props.entries),
    }
  }

  prepareData(entries) {
    const result = _.sortBy(entries, (e) => -(new Date(e.date).getTime()))
    return result
  }

  rowRenderer({ index, isScrolling }) {
    if (isScrolling) {
      return <span>Scrolling...</span>
    }
    const { data } = this.state
    return <Entry {...data[index]} />
  }

  render() {
    const { data } = this.state
    const entriesNotEmpty = data.length > 0

    let content = []
    if (entriesNotEmpty) {
      content = (
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualScroll
              overscanRowCount={10}
              width={width}
              height={300}
              rowHeight={30}
              rowCount={data.length}
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
