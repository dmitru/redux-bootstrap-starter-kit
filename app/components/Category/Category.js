
import React from 'react'
import { Label, Row, Col, Glyphicon } from 'react-bootstrap'

import Spinner from '../Spinner'

import styles from './Category.scss'

const Category = ({ name, isSaving, isSelected, onClick }) => (
  <div onClick={onClick} className={styles.entryContainer}>
    <Row>
      <Col xs={2} style={{ textAlign: 'left', fontWeight: 'bold' }}>
        <span className={isSelected ? styles.activeTickLabel : styles.inactiveTickLabel}>
          <Glyphicon glyph="ok" />
        </span>
      </Col>

      <Col xs={8} style={{ textAlign: 'right' }}>
        <span>
          {isSaving ? <span style={{ marginRight: '5px' }}><Spinner /></span> : null}
          <Label bsStyle={'default'}>{name}</Label>
        </span>
      </Col>
    </Row>
  </div>
)

Category.propTypes = {
  name: React.PropTypes.string.isRequired,
  isSaving: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
}

export default Category
