
import React, { PropTypes } from 'react'
import _ from 'lodash'
import Typeahead from 'react-bootstrap-typeahead'

import FormField from './FormField'

export default class Select extends FormField {
  static propTypes = {
    field: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  handleBlur(ev) {
    const { options, field } = this.props
    const value = ev.nativeEvent.target.value
    const matchedOption = _.find(options, (o) => o.name === value)
    if (matchedOption) {
      field.onChange([matchedOption])
    } else {
      field.onBlur(ev)
    }
  }

  handleKeydown(e) {
    const keyCode = e.keyCode || e.which
    if (keyCode === 13) {
      e.preventDefault()
    }
  }

  render() {
    const { field, help, label, options, ...inputProps } = this.props
    return (
      <div onKeyDown={this.handleKeydown}>
        <FormField field={field} help={help} inputProps={inputProps} label={label}>
          <Typeahead
            selected={Array.isArray(field.value) ? field.value : []}
            {...inputProps}
            options={options}
            onBlur={this.handleBlur}
            onChange={field.onChange}
          />
        </FormField>
      </div>
    )
  }
}
