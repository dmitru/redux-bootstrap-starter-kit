/**
 * Created by dmitru on 6/12/16.
 */

/*
 * Taken from https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js
 * */

import React, { Component } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import {
  Row,
  Col,
  Button,
  Label,
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
  if (values.category && !Array.isArray(values.category)) {
    errors.category = 'Unknown category'
  }
  if (!_.isEmpty(values.amount) && !/^[-+]?\d+(,\d+)*(\.\d+(e\d+)?)?$/.test(values.amount)) {
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
          <Col
            xs={6}
            sm={4}
            lg={4}
            xl={6}
            style={{ paddingRight: '5px' }}
          >
            <TypeaheadInput
              field={category}
              placeholder="Category"
              labelKey="name"
              options={categories}
              renderMenuItemChildren={(props, option) => (
                <Label>{option.name}</Label>
              )}
            />
          </Col>
          <Col
            xs={6}
            sm={4}
            lg={4}
            xl={6}
            style={{ paddingLeft: '5px' }}
          >
            <TextInput
              autoFocus
              autocomplete="off"
              placeholder="Amount"
              field={amount}
              id="amount"
            />
          </Col>
          <Col
            xs={12}
            sm={4}
            lg={4}
          >
            <Col
              xs={6}
              sm={4}
              lg={4}
              style={{ paddingRight: '5px', textAlign: 'right' }}
            >
              <div className="pull-right">
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
              </div>
            </Col>
            <Col xs={6} style={{ paddingLeft: '5px', textAlign: 'left' }}>
              <Button
                type="submit"
                bsStyle="default"
              >
                ADD
              </Button>
            </Col>
          </Col>
        </Row>
      </form>
    )
  }
}

const formConfig = {
  form: 'addEntry',
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
