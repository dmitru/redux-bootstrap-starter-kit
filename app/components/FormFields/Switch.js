// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'
import SwitchElement from 'react-flexible-switch'
import FormField from './FormField'

export default class SwitchField extends FormField {
  static propTypes = {
    field: PropTypes.object.isRequired,
  }

  render() {
    const { field, style, labels: { on, off }, ...inputProps } = this.props
    return (
      <div
        style={{
          ...style,
          float: 'left',
          textAlign: 'center',
        }}
      >
        <span style={{ cursor: 'pointer' }}>
          <SwitchElement
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
