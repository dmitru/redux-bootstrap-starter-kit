

import React from 'react'
import classNames from 'classnames'
import { Glyphicon } from 'react-bootstrap'

import styles from './Loading.css'

export default class Loading extends React.Component {
  static propTypes = {
    delay: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number,
    ]),
    inline: React.PropTypes.bool,
    text: React.PropTypes.string,
  }

  getDefaultProps() {
    return {
      delay: 500,
      inline: false,
    }
  }
  getInitialState() {
    return {
      delaying: !!this.props.delay,
    }
  }
  componentDidMount() {
    if (this.props.delay) {
      this.timeout = setTimeout(this.handleDisplay, this.props.delay)
    }
  }
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  handleDisplay() {
    this.timeout = null
    this.setState({ delaying: false })
  }

  render() {
    const { delay, inline, text } = this.props
    const { delaying } = this.state
    const classNamesConfig = {}
    classNamesConfig[styles.loadingDelayed] = delaying
    classNamesConfig[styles.loadingDisplayed] = delay && !delaying
    classNamesConfig[styles.loadingInline] = inline
    const className = classNames('Loading', classNamesConfig)
    return (
      <div className={className}>
        <Glyphicon glyph="refresh" />
        {text && <div className={styles.loadingText}>{text}&hellip;</div>}
      </div>
    )
  }
}
