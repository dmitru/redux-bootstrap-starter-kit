/**
 * Created by dmitriybor on 03.06.16.
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'
import { Nav, Navbar, NavItem, Grid, Col, Row } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import { logout } from '../actions/user'

const Layout = ({ onLogout, children, isAuthenticated, username }) => {
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
    <LinkContainer to="/about" key={3}>
      <NavItem eventKey={3}>About</NavItem>
    </LinkContainer >,
    <LinkContainer to="/login" key={2}>
      <NavItem eventKey={2}>Login</NavItem>
    </LinkContainer >,
  ]

  const navbarLinksRight = isAuthenticated ? [
    <Navbar.Text eventKey={10} key={10}>Logged in as {username}</Navbar.Text>,
    <NavItem eventKey={11} onClick={onLogout} key={11}>Logout</NavItem>,
  ] : [
  ]

  return (
    <div>
      <Navbar fluid staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">Expense Tracker</IndexLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav navbar>
          {navbarLinks.map((e) => e)}
        </Nav>
        <Nav pullRight>
          {navbarLinksRight.map((e) => e)}
        </Nav>
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

Layout.propTypes = {
  children: React.PropTypes.node,
  onLogout: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool,
  username: React.PropTypes.string,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.name || false,
  username: state.user.name,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onLogout: logout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

