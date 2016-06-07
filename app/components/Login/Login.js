/*
 * Taken from https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js
 * */

import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import {
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Button,
  Col,
  Alert } from 'react-bootstrap'

import Loader from '../Loader'
import { login } from '../../actions/auth'
import styles from './Login.css'
import { getIsAuthenticated } from '../../selectors/auth'

class LoginContainer extends Component {
  static propTypes = {
    isAuthenticating: React.PropTypes.bool.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    authError: React.PropTypes.string.isRequired,
    redirect: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
  }

  constructor(props) {
    super(props)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.state = {
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    this.ensureNotLoggedIn(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.ensureNotLoggedIn(nextProps)
  }

  onClick = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(login({
      email: this.state.email,
      password: this.state.password,
    }))
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  ensureNotLoggedIn = (props) => {
    const { dispatch, redirect, isAuthenticated } = props
    if (isAuthenticated) {
      dispatch(routerActions.replace(redirect))
    }
  }

  render() {
    const { authError, isAuthenticating } = this.props
    const errorMessage = authError ?
      (<Alert bsStyle="danger">
        <strong>Can't login</strong>: {authError}
      </Alert>) : null
    const spinner = isAuthenticating ? <Loader /> : null

    return (
      <div>
        <Col xs={6} xsOffset={3} style={{ textAlign: 'center' }}>
          <h2>Log in to the app</h2>

          <Form horizontal className={styles.loginForm}>
            {errorMessage}

            <Alert bsStyle="info">
              <strong>Hint</strong>: use the following email: <code>"test@user.com"</code>
            </Alert>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={4}>
                Email
              </Col>
              <Col sm={8}>
                <FormControl
                  type="email" placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={4}>
                Password
              </Col>
              <Col sm={8}>
                <FormControl
                  type="password" placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Col>
            </FormGroup>

            <div>
              <Button onClick={this.onClick} type="submit">
                Login
              </Button>

            </div>
          </Form>

          {spinner}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const redirect = ownProps.location.query.redirect || '/'
  return {
    redirect,
    authError: state.auth.error,
    isAuthenticating: state.auth.isAuthenticating,
    isAuthenticated: getIsAuthenticated(state),
  }
}

export default connect(mapStateToProps)(LoginContainer)
