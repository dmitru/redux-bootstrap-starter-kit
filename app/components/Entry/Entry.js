/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Label, Row, Col } from 'react-bootstrap'

import styles from './Entry.scss'

const Entry = ({ date, amount, type, category }) => {
  const isExpense = type === 'e'
  const amountStyle = isExpense ? styles.amountExpense : styles.amountIncome
  return (
    <Row>
      <Col xs={5} xsOffset={1}>
        <span>
          {moment(date).format('DD.MM.YYYY, hh:mm:ss')}
        </span>
      </Col>

      <Col xs={2} style={{ textAlign: 'right' }}>
        <span className={amountStyle}>
          <span style={!isExpense ? { visibility: 'hidden' } : null}>&nbsp;&ndash;</span>
          {amount}
        </span>
      </Col>

      <Col xs={4}>
        <span>
          {!_.isNull(category) && (
            <span>
              <Label
                className={isExpense ? styles.expenseLabel : styles.incomeLabel}
              >
                {category}
              </Label>
            </span>)
          }
        </span>
      </Col>
    </Row>
  )
}

Entry.propTypes = {
  date: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  category: React.PropTypes.string,
}

export default Entry
