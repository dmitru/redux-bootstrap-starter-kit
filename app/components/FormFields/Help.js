
import React from 'react'
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap'

import styles from './Help.css'

const Help = ({ text }) => {
  const tooltip = <Tooltip>{text}</Tooltip>
  return (
    <OverlayTrigger overlay={tooltip} delayShow={300} delayHide={150}>
      <Glyphicon className={styles.help} glyph="question-sign" />
    </OverlayTrigger>
  )
}

Help.propTypes = {
  text: React.PropTypes.string.isRequired,
}

export default Help
