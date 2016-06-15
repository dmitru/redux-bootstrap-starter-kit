// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'
import SwitchElement from 'react-flexible-switch'
import FormField from './FormField'

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
        onClick={this.toggleSwitch}
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
            className="form-control"
            active={field.value}
            name={field.name}
            onActive={() => field.onChange(true)}
            onInactive={() => field.onChange(false)}
          />
        </span>
        <span
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
