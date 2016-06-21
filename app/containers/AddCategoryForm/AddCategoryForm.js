
import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import { TextInput } from '../../components/FormFields'

import { getCategories } from '../../reducers/categories'

export const fields = ['name']

const validate = (values, props) => {
  const errors = {}
  const name = _.trim(values.name)
  const { categories } = props
  if (_.includes(_.map(categories, (c) => c.name), name)) {
    errors.name = 'This name is already used by another category'
  }
  return errors
}

class AddCategory extends Component {
  static propTypes = {
    categories: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { fields: { name }, handleSubmit } = this.props
    return (
      <form
        className={classNames('form-horizontal')}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col xs={9} sm={6} smOffset={2} style={{ paddingRight: '5px' }}>
            <TextInput
              autoFocus
              autocomplete="off"
              placeholder="Name of category"
              field={name}
              id="name"
            />
          </Col>
          <Col xs={3} sm={2} style={{ paddingLeft: '5px' }}>
            <Button
              type="submit"
              bsStyle="default"
            >
                ADD
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

const formConfig = {
  form: 'addCategory',
  fields,
  validate,
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
})

export default reduxForm(formConfig, mapStateToProps)(AddCategory)
