
import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import {
  Button,
} from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import {
  TextInput,
} from '../../components/FormFields'

export const fields = ['name']

const validate = (values, props) => {
  const errors = {}
  const name = _.trim(values.name)
  if (_.isEmpty(name)) {
    errors.name = 'A name is required'
  }
  const { otherCategories } = props
  if (_.includes(_.map(otherCategories, (c) => c.name), name)) {
    errors.name = 'This name is already used by another category'
  }
  return errors
}

const EditCategoryForm = ({
    fields: { name },
    handleSubmit,
    onCancel,
  }) => (
  <form className={classNames('form-horizontal')} onSubmit={handleSubmit}>
    <TextInput
      placeholder="Name of category"
      field={name}
      id="name"
    />
    <Button bsStyle="default" onClick={onCancel}>Cancel</Button>
    <Button type="submit" bsStyle="default">Save</Button>
  </form>
)

EditCategoryForm.propTypes = {
  initialValues: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  otherCategories: React.PropTypes.array.isRequired,
  onCancel: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
}

const formConfig = {
  form: 'editCategory',
  fields,
  validate,
}

const EditCategoryFormComponent = reduxForm(formConfig)(EditCategoryForm)


class EditCategoryFormWrapper extends Component {
  static propTypes = {
    category: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFieldsFromCategory(category) {
    if (!category) {
      return {}
    }
    return {
      name: category.name,
    }
  }

  handleSubmit(data) {
    const { category, onSubmit } = this.props
    onSubmit({
      category: {
        ...category,
        name: _.trim(data.name),
      },
    })
  }

  render() {
    const { onCancel, category, categories } = this.props
    const otherCategories = _.filter(categories, (c) => c.id !== category.id)
    console.log([otherCategories, categories, category])
    return (
      <EditCategoryFormComponent
        onSubmit={this.handleSubmit} onCancel={onCancel}
        otherCategories={otherCategories}
        initialValues={this.getFieldsFromCategory(category)}
      />
    )
  }
}

export default EditCategoryFormWrapper
