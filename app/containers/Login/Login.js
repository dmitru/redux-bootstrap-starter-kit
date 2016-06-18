/*
 * Taken from https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js
 * */

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
import { login } from '../../actions/auth/auth'
import { getIsAuthenticated, getIsLoggingIn, getLoginErrorMessage } from '../../reducers/auth'

import styles from './Login.css'

export const fields = ['email', 'password']

const validate = values => {
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

class LoginContainer extends Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    isAuthenticating: React.PropTypes.bool.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    loginError: React.PropTypes.string,
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
    dispatch(login({
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
    const { fields: { email, password }, loginError, isAuthenticating } = this.props
    const spinner = isAuthenticating ? <Loader /> : null

    return (
      <div>
        <Col xs={6} xsOffset={3} style={{ textAlign: 'center' }}>
          <h2>Log in to the app</h2>

          <form
            className={classNames(styles.loginForm, 'form-horizontal')}
            onSubmit={this.props.handleSubmit(this.handleSubmit)}
          >
            <Row>
              <Alert bsStyle="info">
                <strong>Hint</strong>: use the following email: <code>"test@user.com"</code> and
                <strong>any password</strong>
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
              <Button type="submit" disabled={isAuthenticating}>
                Log in
              </Button>
              <Button
                onClick={() => this.props.dispatch(routerActions.replace('/signup'))}
                disabled={isAuthenticating}
                style={{ marginLeft: '15px' }}
              >
                Sign up
              </Button>
            </Row>

            <Row style={{ marginTop: '15px' }}>
              {loginError ? (
                <Alert bsStyle="danger">
                  <strong>Can't login: </strong>{loginError}
                </Alert>) : null}
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

const formConfig = {
  form: 'login',
  fields,
  validate,
}

const mapStateToProps = (state, ownProps) => {
  const redirect = ownProps.location.query.redirect || '/'
  return {
    redirect,
    loginError: getLoginErrorMessage(state),
    isLoggingIn: getIsLoggingIn(state),
    isAuthenticated: getIsAuthenticated(state),
  }
}

export default reduxForm(formConfig, mapStateToProps)(LoginContainer)
