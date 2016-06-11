/**
 * Created by dmitriybor on 03.06.16.
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Nav, Navbar, NavItem, Grid, Col, Row, Glyphicon } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

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

    const navbarLinks = isAuthenticated ? [
      <IndexLinkContainer to="/" key={1}>
        <NavItem eventKey={1} index>Entries</NavItem>
      </IndexLinkContainer >,
      <LinkContainer to="/categories" key={2}>
        <NavItem eventKey={2}>Categories</NavItem>
      </LinkContainer >,
      <LinkContainer to="/about" key={3}>
        <NavItem eventKey={3}>About</NavItem>
      </LinkContainer >,
    ] : [
      <LinkContainer to="/about" key={1}>
        <NavItem eventKey={1}>About</NavItem>
      </LinkContainer >,
      <LinkContainer to="/login" key={2}>
        <NavItem eventKey={2}><Glyphicon glyph="log-in" /> Login</NavItem>
      </LinkContainer >,
      <LinkContainer to="/signup" key={3}>
        <NavItem eventKey={3}><Glyphicon glyph="user" /> Sign Up</NavItem>
      </LinkContainer >,
    ]

    const navbarLinksRight = isAuthenticated ? [
      username ? (
        <Navbar.Text eventKey={10} key={10}>
          <span style={{ padding: '10px 15px' }} role="presentation">Logged in as {username}</span>
        </Navbar.Text>) : null,
      <NavItem eventKey={11} onClick={onLogout} key={11}>
        <Glyphicon glyph="log-out" /> Logout
      </NavItem>,
    ] : [
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
              {navbarLinks.map((e) => e)}
            </Nav>
            <Nav pullRight>
              {navbarLinksRight.map((e) => e)}
            </Nav>
          </div>
        </Navbar>

        <Grid>
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

