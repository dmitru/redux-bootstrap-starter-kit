
import React, { Component } from 'react'
import classNames from 'classnames'
import {
  Button,
} from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import {
  TextInput,
  TypeaheadInput,
  Switch,
} from '../../components/FormFields'

import { getCategories } from '../../reducers/categories'

export const fields = ['amount', 'category', 'isIncome']

const validate = (values) => {
  const errors = {}
  if (!values.category) {
    errors.category = 'Is required'
  } else if (!Array.isArray(values.category)) {
    errors.category = 'Unknown category'
  }
  if (!/^[-+]?\d+(,\d+)*(\.\d+(e\d+)?)?$/.test(values.amount)) {
    errors.amount = 'A number is required'
  }
  return errors
}

const EditEntryForm = ({
    fields: { amount, category, isIncome },
    categories,
    handleSubmit,
    onCancel,
  }) => (
  <form className={classNames('form-horizontal')} onSubmit={handleSubmit}>
    <TypeaheadInput
      field={category}
      placeholder="Category"
      labelKey="name"
      options={categories}
    />
    <TextInput
      autocomplete="off"
      placeholder="Amount"
      field={amount}
      id="amount"
    />
    <Switch
      field={isIncome}
      labels={{
        on: 'INCOME',
        off: 'EXPENSE',
      }}
      switchStyles={{
        width: 50,
      }}
    />
    <Button bsStyle="default" onClick={onCancel}>Cancel</Button>
    <Button type="submit" bsStyle="default">Save</Button>
  </form>
)

EditEntryForm.propTypes = {
  initialValues: React.PropTypes.object,
  categories: React.PropTypes.array.isRequired,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
}

const formConfig = {
  form: 'edit-entry',
  fields,
  validate,
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
})

const EditEntryFormComponent = reduxForm(formConfig, mapStateToProps)(EditEntryForm)


class EditEntryFormWrapper extends Component {
  static propTypes = {
    entry: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFieldsFromEntry(entry) {
    if (!entry) {
      return {}
    }
    return {
      isIncome: entry.type === 'i',
      amount: entry.amount,
      category: [entry.category],
    }
  }

  handleSubmit(data) {
    const { entry, onSubmit } = this.props
    onSubmit({
      entry: {
        ...entry,
        amount: parseFloat(data.amount),
        type: data.isIncome ? 'i' : 'e',
        categoryId: data.category[0].id,
      },
    })
  }

  render() {
    const { onCancel, entry } = this.props
    return (
      <EditEntryFormComponent
        onSubmit={this.handleSubmit} onCancel={onCancel}
        initialValues={this.getFieldsFromEntry(entry)}
      />
    )
  }
}

export default EditEntryFormWrapper
