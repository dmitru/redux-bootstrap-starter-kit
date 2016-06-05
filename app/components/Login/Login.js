/*
 * Taken from https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js
 * */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { ThreeBounce } from 'better-react-spinkit'
import {
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Button,
  Col,
  Alert } from 'react-bootstrap'

import { login } from '../../actions/user'
import styles from './Login.css'

class LoginContainer extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.string,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  constructor(props) {
    super(props)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
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
    this.setState({
      isLoading: true,
    })
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    }, () => {
      this.setState({ isLoading: false })
    })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  ensureNotLoggedIn = (props) => {
    const { isAuthenticated, replace, redirect } = props

    if (isAuthenticated) {
      replace(redirect)
    }
  }

  render() {
    const errorMessage = this.props.error ?
      (<Alert bsStyle="danger">
        <strong>Can't login</strong>: {this.props.error}
      </Alert>) : null
    const spinner = this.state.isLoading ? <ThreeBounce fadeIn={false} /> : null

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
  const isAuthenticated = state.user.tokenId != null
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect,
    error: state.user.error,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  replace: routerActions.replace,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
