// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'

import FormField from './FormField'

export default class PasswordInput extends FormField {
  static propTypes = {
    field: PropTypes.object.isRequired,
  }

  render() {
    const { field, help, label, ...inputProps } = this.props
    return (
      <FormField field={field} help={help} inputProps={inputProps} label={label}>
        <input
          value={field.value}
          type="password"
          {...inputProps}
          className="form-control"
          name={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
        />
      </FormField>
    )
  }
}
