// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'
import SwitchElement from 'react-flexible-switch'
import FormField from './FormField'

import globalStyles from '../../assets/app.scss'

export default class SwitchField extends FormField {
  static propTypes = {
    field: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.toggleSwitch = this.toggleSwitch.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  toggleSwitch() {
    this.switch.setState({ active: !this.switch.state.active })
  }

  handleKeydown(e) {
    const code = e.which
    if (code === 13 || code === 32) {
      e.preventDefault()
      this.toggleSwitch()
    }
  }

  render() {
    const { field, style, labels: { on, off }, ...inputProps } = this.props
    return (
      <div
        role="button"
        tabIndex="0"
        onKeyDown={this.handleKeydown}
        style={{
          ...style,
          float: 'left',
          textAlign: 'center',
        }}
      >
        <span style={{ cursor: 'pointer' }} >
          <SwitchElement
            ref={(c) => { this.switch = c }}
            {...inputProps}
            circleStyles={{
              diameter: 15,
              onColor: globalStyles.infoColor,
            }}
            className="form-control"
            active={field.value}
            name={field.name}
            onActive={() => field.onChange(true)}
            onInactive={() => field.onChange(false)}
          />
        </span>
        <span
          onClick={this.toggleSwitch}
          style={{
            fontSize: '0.6em',
          }}
        >
          {field.value ? on : off}
        </span>
      </div>
    )
  }
}
