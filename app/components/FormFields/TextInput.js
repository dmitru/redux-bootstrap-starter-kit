// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'

import FormField from './FormField'

export default class TextInput extends FormField {
  static propTypes = {
    field: PropTypes.object.isRequired,
  }

  render() {
    const { field, help, label, placeholder, ...inputProps } = this.props
    return (
      <FormField field={field} help={help} inputProps={inputProps} label={label}>
        <input
          {...inputProps}
          placeholder={placeholder}
          className="form-control"
          name={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
        />
      </FormField>
    )
  }
}
