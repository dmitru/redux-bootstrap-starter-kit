/*
 * Taken from https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js
 * */

import { connect } from 'react-redux'
import React, { Component } from 'react'
import classNames from 'classnames'
import { routerActions } from 'react-router-redux'
import {
  Col,
  Row,
  Alert,
  Button,
} from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import Loader from '../../components/Loader'
import {
  TextInput,
  PasswordInput,
} from '../../components/FormFields'
import { signup } from '../../actions/auth/auth'
import { getIsSigningUp, getAuthErrorMessage, getIsAuthenticated } from '../../reducers/auth'

import styles from './Signup.css'

export const fields = ['email', 'password']

const validateForm = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Should be longer than 6 characters'
  }
  return errors
}

class SignupContainer extends Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    isSigningUp: React.PropTypes.bool.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    authError: React.PropTypes.string,
    redirect: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
  }

  componentWillMount() {
    this.ensureNotLoggedIn(this.props)
  }

  componentWillReceiveProps(props) {
    this.ensureNotLoggedIn(props)
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props
    dispatch(signup({
      email: values.email,
      password: values.password,
    }))
  }

  ensureNotLoggedIn = (props) => {
    const { dispatch, redirect, isAuthenticated } = props
    if (isAuthenticated) {
      dispatch(routerActions.replace(redirect))
    }
  }

  render() {
    const { fields: { email, password }, authError, isSigningUp } = this.props
    const spinner = isSigningUp ? <Loader /> : null
    const errorMessage = authError ? `Can't login: ${authError}` : null

    return (
      <div>
        <Col xs={6} xsOffset={3} style={{ textAlign: 'center' }}>
          <h2>Sign up</h2>

          <form
            className={classNames(styles.loginForm, 'form-horizontal')}
            onSubmit={this.props.handleSubmit(this.handleSubmit)}
          >
            <Row>
              <Alert bsStyle="info">
                <strong>Hint</strong>: use the following email: <code>"test@user.com"</code>
              </Alert>
            </Row>

            <Row>
              <TextInput
                field={email}
                id="email"
                label="Email:"
              />
            </Row>

            <Row>
              <PasswordInput
                field={password}
                id="password"
                label="Password:"
              />
            </Row>

            <Row>
              <Button type="submit" disabled={isSigningUp}>
                Sign up
              </Button>
            </Row>

            <Row style={{ marginTop: '15px' }}>
              {errorMessage ? <Alert bsStyle="danger">{errorMessage}</Alert> : null}
            </Row>

            <Row>
              {spinner}
            </Row>
          </form>
        </Col>
      </div>
    )
  }
}

const SignupFormContainer = reduxForm({
  form: 'signup',
  fields,
  validateForm,
})(SignupContainer)

const mapStateToProps = (state, ownProps) => {
  const redirect = ownProps.location.query.redirect || '/'
  return {
    redirect,
    authError: getAuthErrorMessage(state),
    isAuthenticated: getIsAuthenticated(state),
    isSigningUp: getIsSigningUp(state),
  }
}

export default connect(mapStateToProps)(SignupFormContainer)
