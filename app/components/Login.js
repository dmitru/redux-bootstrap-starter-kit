/*
 * Taken from https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/basic/components/Login.js
 * */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { ControlLabel, Form, FormGroup, FormControl, Button, Col, Checkbox } from 'react-bootstrap'

import Layout from './Layout'
import { login } from '../actions/user'

class LoginContainer extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
    this.props.login({
      email: this.state.email,
      password: this.state.password,
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
    return (
      <div>
        <Layout>
          <Col xs={6} xsOffset={3} style={{ textAlign: 'center' }}>
            <h2>Log in to the app</h2>

            <Form horizontal>
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

              <FormGroup>
                <Col smOffset={4} sm={4}>
                  <Checkbox>Remember me</Checkbox>
                </Col>
              </FormGroup>
              <Button onClick={this.onClick} type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Layout>
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
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  replace: routerActions.replace,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
