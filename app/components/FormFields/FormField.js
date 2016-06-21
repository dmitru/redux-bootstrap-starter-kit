// Source:
// https://gist.github.com/insin/bbf116e8ea10ef38447b

import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import classNames from 'classnames'

import Help from './Help'
import Loading from './Loading'

const FIELD_EVENT_HANDLER = /^(?:on|handle)[A-Z]/

/**
 * Perform shallow equals comparison of two redux-form field objects to
 * determine if the field has changed.
 */
function fieldShallowEquals(field, nextField) {
  for (const prop of Object.keys(field)) {
    // Ignore event handlers, as they continually get recreated by redux-form
    if (!FIELD_EVENT_HANDLER.test(prop) && field[prop] !== nextField[prop]) {
      return false
    }
  }
  return true
}

/**
 * A form field in a Bootstrap 3 two column layout.
 *
 * This component manages:
 * - Bootstrap structure and classes
 * - A loading indicator
 * - A <Label> for the field
 * - Label help text
 * - Validation error style and display
 *
 * The form input itself should be passed as content.
 */
export default class FormField extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    // A redux-form field object
    field: PropTypes.object,
    // Help text to be displayed next to the label
    help: PropTypes.string,
    // An additional class to be applied to the input container
    inputClass: PropTypes.string,
    // Props used for the input (id is used to link the label to the input)
    inputProps: PropTypes.object,
    // Label text
    label: PropTypes.string,
    // Loading state
    loading: PropTypes.bool,
  }

  static defaultProps = {
    field: {},
    inputProps: {},
  }

  /**
   * Perform shallow equals comparison to determine if the props of the context
   * form field component have changed, with special-case handling for the "field"
   * prop, provided by redux-form.
   * Use this as shouldComponentUpdate() on components which compose a
   * FormField in their render() method and they will only re-render when
   * necessary.
   */

  static shouldFormFieldUpdate(nextProps) {
    const keys = Object.keys(this.props)
    const nextKeys = Object.keys(nextProps)
    if (keys.length !== nextKeys.length) return true
    const nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (!nextHasOwnProperty(key) ||
        key === 'field' ? !fieldShallowEquals(this.props[key], nextProps[key])
          : this.props[key] !== nextProps[key]) {
        return true
      }
    }
    return false
  }

  render() {
    const { field, help, inputClass, inputProps, label, loading } = this.props
    console.log(field)
    const error = field.touched && field.error
    if (label) {
      return (
        <Row className={classNames('form-group', { 'has-error': error })}>
          <Col sm={4} className="control-label">
            {loading && <Loading inline />} <label htmlFor={inputProps.id}>{label}</label>
            {help && <Help text={help} />}
          </Col>
          <Col sm={8} className={inputClass}>
            {this.props.children}
            {error && <p className="help-block" style={{ marginBottom: 0 }}>{error}</p>}
          </Col>
        </Row>
      )
    }
    return (
      <Row className={classNames('form-group', { 'has-error': error })}>
        <Col xs={12}>
          {this.props.children}
          {error && <p className="help-block" style={{ marginBottom: 0 }}>{error}</p>}
        </Col>
      </Row>
    )
  }
}
