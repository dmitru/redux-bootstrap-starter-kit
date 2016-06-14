/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Label, Row, Col, Glyphicon } from 'react-bootstrap'

import styles from './Entry.scss'

const Entry = ({ date, amount, type, category, isSaving, isSelected, onClick }) => {
  const isExpense = type === 'e'
  const amountStyle = isExpense ? styles.amountExpense : styles.amountIncome
  return (
    <div onClick={onClick} className={styles.entryContainer}>
      <Row>
        <Col xs={2} sm={1} style={{ textAlign: 'right', fontWeight: 'bold' }}>
          <span className={isSelected ? styles.activeTickLabel : styles.inactiveTickLabel}>
            <Glyphicon glyph="ok" />
          </span>
        </Col>

        <Col xs={3} lg={2} style={{ textAlign: 'right', fontWeight: 'bold', paddingLeft: '0px' }}>
          <span className={amountStyle}>
            {isExpense ? '-' : '+'}&nbsp;{amount}&nbsp;$
          </span>
        </Col>

        <Col xs={6} sm={4} lg={4} style={{ textAlign: 'right' }}>
          <span>
            {!_.isNull(category) && (
              <span>
                {isSaving ? '(saving) ' : ''}

                <Label
                  className={isExpense ? styles.expenseLabel : styles.incomeLabel}
                >
                  {category}
                </Label>
              </span>)
            }
          </span>
        </Col>

        <Col sm={4} lg={5} style={{ textAlign: 'right' }} xsHidden>
          <span
            title={moment(date).format('DD.MM.YYYY hh:mm:ss')}
            style={{ marginRight: '15px', fontSize: 'smaller' }}
          >
            {moment(date).format('DD.MM.YYYY hh:mm:ss')}
          </span>
        </Col>
      </Row>
    </div>
  )
}

Entry.propTypes = {
  date: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  category: React.PropTypes.string,
  isSaving: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
}

export default Entry
