/**
 * Created by dmitru on 6/5/16.
 */

import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'

import styles from './Loader.css'

export default () => (
  <div className={styles.loader}>
    <ThreeBounce fadeIn={false} />
  </div>
)
