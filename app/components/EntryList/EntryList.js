/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'

import Entry from '../Entry'

const EntryList = ({ entries = [] }) => {
  const entriesNotEmpty = entries.length > 0
  let content = []
  if (entriesNotEmpty) {
    content = entries.map((entry) => (
      <Entry key={entry.id} {...entry} />
    ))
  }
  return (
    <div>
      {entriesNotEmpty ? content : <span>No items to show.</span>}
    </div>
  )
}

EntryList.propTypes = {
  entries: React.PropTypes.array,
}

export default EntryList
