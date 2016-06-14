/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Label, Row, Col } from 'react-bootstrap'

import styles from './Entry.scss'

const Entry = ({ date, amount, type, category, isSaving }) => {
  const isExpense = type === 'e'
  const amountStyle = isExpense ? styles.amountExpense : styles.amountIncome
  return (
    <div>
      <Row>
        <Col xs={2} style={{ textAlign: 'right', fontWeight: 'bold' }}>
          <span className={amountStyle}>
            {isExpense ? '-' : '+'}&nbsp;{amount}&nbsp;$
          </span>
        </Col>

        <Col xs={5} style={{ textAlign: 'right' }}>
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

        <Col xs={5} style={{ textAlign: 'right' }}>
          <span
            title={moment(date).format('DD.MM.YYYY hh:mm:ss')}
            style={{ marginRight: '15px', fontSize: 'smaller' }}
          >
            {moment(date).format('DD.MM.YYYY hh:mm:ss')}
          </span>
        </Col>
      </Row>
      <hr style={{ marginBottom: '5px', marginTop: '11px' }} />
    </div>
  )
}

Entry.propTypes = {
  date: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  category: React.PropTypes.string,
  isSaving: React.PropTypes.bool,
}

export default Entry
