// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'
import Typeahead from 'react-bootstrap-typeahead'

import FormField from './FormField'

export default class Select extends FormField {
  static propTypes = {
    field: PropTypes.object.isRequired,
  }

  render() {
    const { field, help, label, ...inputProps } = this.props
    return (
      <FormField field={field} help={help} inputProps={inputProps} label={label}>
        <Typeahead
          {...inputProps}
          onBlur={field.onBlur}
          onChange={field.onChange}
        />
      </FormField>
    )
  }
}
