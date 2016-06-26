/**
 * Created by dmitriybor on 03.06.16.
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Nav, Navbar, NavItem, Grid, Col, Row } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import Fontawesome from 'react-fontawesome'

import { logout } from '../../actions/auth/auth'

class Layout extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    onLogout: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool,
    username: React.PropTypes.string,
  }

  static childContextTypes = {
    betterReactSpinkit: React.PropTypes.object,
  }

  getChildContext() {
    return {
      betterReactSpinkit: {
        color: '#31708f',
        size: 20,
      },
    }
  }

  render() {
    const { onLogout, children, isAuthenticated, username } = this.props

    const navbarLinksLeft = isAuthenticated ? [
      <IndexLinkContainer to="/" key={1}>
        <NavItem eventKey={1} index><Fontawesome name="list-ul" /> Entries</NavItem>
      </IndexLinkContainer >,
      <LinkContainer to="/categories" key={2}>
        <NavItem eventKey={2}><Fontawesome name="tags" /> Categories</NavItem>
      </LinkContainer >,
    ] : [
      <LinkContainer to="/about" key={1}>
        <NavItem eventKey={1}><Fontawesome name="question-circle-o" /> About</NavItem>
      </LinkContainer >,
    ]

    const navbarLinksRight = isAuthenticated ? [
      username ? (
        <Navbar.Text eventKey={10} key={10}>
          <span style={{ padding: '10px 15px' }} role="presentation">
            <Fontawesome name="user" /> {username}
          </span>
        </Navbar.Text>) : null,
      <NavItem eventKey={11} onClick={onLogout} key={11}>
        <Fontawesome name="sign-out" /> Logout
      </NavItem>,
    ] : [
      <LinkContainer to="/login" key={2}>
        <NavItem eventKey={2}><Fontawesome name="sign-in" /> Login</NavItem>
      </LinkContainer >,
      <LinkContainer to="/signup" key={3}>
        <NavItem eventKey={3}><Fontawesome name="user" /> Sign Up</NavItem>
      </LinkContainer >,
    ]

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              Expense Tracker
            </Navbar.Brand>
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#header-navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </Navbar.Header>
          <div id="header-navbar" className="navbar-collapse collapse">
            <Nav navbar>
              {navbarLinksLeft.map((e) => e)}
            </Nav>
            <Nav pullRight>
              {navbarLinksRight.map((e) => e)}
            </Nav>
          </div>
        </Navbar>

        <Grid style={{ marginBottom: '25px' }}>
          <Row>
            <Col xs={12}>
              {children}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token != null,
  username: state.profile.user && state.profile.user.email,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onLogout: logout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

