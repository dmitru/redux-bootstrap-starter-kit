/**
 * Created by dmitru on 6/12/16.
 */

/*
 * Taken from https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js
 * */

import React, { Component } from 'react'
import classNames from 'classnames'
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import {
  TextInput,
  TypeaheadInput,
  Switch,
} from '../../components/FormFields'

import { getCategories } from '../../reducers/categories'
import styles from './AddEntryForm.scss'

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

class AddEntry extends Component {
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
    const { fields: { amount, category, isIncome }, categories, handleSubmit } = this.props
    return (
      <form className={classNames('form-horizontal')} onSubmit={handleSubmit}>
        <Row>
          <Col xs={6}>
            <TypeaheadInput
              field={category}
              placeholder="Category"
              labelKey="name"
              options={categories}
            />
          </Col>
          <Col xs={6}>
            <TextInput
              placeholder="Amount"
              field={amount}
              id="amount"
            />
          </Col>
        </Row>

        <div style={{ textAlign: 'center' }}>
          <Switch
            field={isIncome} handleWidth={30} labelWidth={20} size="mini" onText=""
            offText="" onColor="success" offColor="danger"
          />
          <Button
            type="submit"
            style={{ width: '100px' }}
            bsClass={classNames(
              'btn', 'btn-sm',
              isIncome.value ? 'btn-default' : 'btn-default',
              styles.btnAddExpenseEntry)}
          >
            {isIncome.value ? 'Add Income' : 'Add Expense'}
          </Button>
        </div>
      </form>
    )
  }
}

const formConfig = {
  form: 'add-entry',
  fields,
  validate,
  initialValues: {
    isIncome: false,
  },
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
})

export default reduxForm(formConfig, mapStateToProps)(AddEntry)
