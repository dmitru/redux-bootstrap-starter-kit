
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

const EntryListToolbar = (props) => {
  // TODO: move the styles to a SASS file
  const styles = {
    activeToolbarLink: { fontWeight: 'bold', color: '#337ab7', transition: 'all 0.3s ease' },
    inactiveToolbarLink: { fontWeight: 'bold', color: '#ccc', transition: 'all 0.3s ease' },
  }
  const {
    editButtonEnabled,
    deleteButtonEnabled,
    toggleSelectionEnabled,
    onEditEntryClick,
    onDeleteEntryClick,
    onToggleSelectionClick,
  } = props
  const editButton = (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        if (editButtonEnabled && onEditEntryClick) {
          onEditEntryClick()
        }
      }}
      style={editButtonEnabled ? styles.activeToolbarLink : styles.inactiveToolbarLink} key="1"
    >
      <Glyphicon glyph="edit" />&nbsp;EDIT
    </a>
  )
  const deleteButton = (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        if (deleteButtonEnabled && onDeleteEntryClick) {
          onDeleteEntryClick()
        }
      }}
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
      onClick={(e) => {
        e.preventDefault()
        if (onToggleSelectionClick) {
          onToggleSelectionClick()
        }
      }}
      style={toggleSelectionEnabled ? styles.activeToolbarLink : styles.inactiveToolbarLink}
      key="3"
    >
      {toggleSelectionEnabled ? 'CLEAR' : 'ALL'}
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
  return (
    <div>
      {toolbarButtons}
    </div>
  )
}

EntryListToolbar.propTypes = {
  editButtonEnabled: React.PropTypes.bool.isRequired,
  deleteButtonEnabled: React.PropTypes.bool.isRequired,
  toggleSelectionEnabled: React.PropTypes.bool.isRequired,
  onEditEntryClick: React.PropTypes.func,
  onDeleteEntryClick: React.PropTypes.func,
  onToggleSelectionClick: React.PropTypes.func,
}

export default EntryListToolbar
