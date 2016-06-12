// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'
import Switch from 'react-bootstrap-switch'

import FormField from './FormField'

export default class SwitchField extends FormField {
  static propTypes = {
    field: PropTypes.object.isRequired,
  }

  render() {
    const { field, ...inputProps } = this.props
    return (
      <Switch
        {...inputProps}
        state={field.value}
        className="form-control"
        name={field.name}
        onChange={field.onChange}
      />
    )
  }
}
