/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'

import styles from './Entry.css'

const Entry = ({ amount }) => (
  <div className={styles.entryContainer}>amount&nbsp;=&nbsp;{amount}</div>
)

Entry.propTypes = {
  amount: React.PropTypes.number.isRequired,
}

export default Entry
