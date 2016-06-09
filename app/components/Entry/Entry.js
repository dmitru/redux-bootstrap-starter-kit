/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import _ from 'lodash'
import { Label } from 'react-bootstrap'

import styles from './Entry.scss'

const Entry = ({ amount, type, category }) => {
  const isExpense = type === 'e'
  let amountStyle = isExpense ? styles.amountExpense : styles.amountIncome
  return (
    <div className={styles.entryContainer}>
      amount: <span className={amountStyle}>{isExpense ? '-' : ''}{amount}</span>
      {!_.isNull(category) && (
        <span className={styles.category}><Label>{category}</Label></span>
      )}
    </div>
  )
}

Entry.propTypes = {
  amount: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  category: React.PropTypes.string,
}

export default Entry
