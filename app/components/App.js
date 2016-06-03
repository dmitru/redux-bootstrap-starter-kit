import React from 'react'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { Nav, Navbar, NavItem, Grid, Col, Row } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

class App extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Navbar fluid staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">Expense Tracker</IndexLink>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav navbar>
            <IndexLinkContainer to="/">
              <NavItem eventKey={1} index>Entries</NavItem>
            </IndexLinkContainer >
            <LinkContainer to="/categories">
              <NavItem eventKey={2}>Categories</NavItem>
            </LinkContainer >
            <LinkContainer to="/about">
              <NavItem eventKey={3}>About</NavItem>
            </LinkContainer >
          </Nav>
        </Navbar>

        <Grid>
          <Row>
            <Col xs={12}>
              <div> {this.props.children} </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.Array,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
