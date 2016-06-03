import React from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

class App extends React.Component {

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
                        <LinkContainer  to='/categories'>
                            <NavItem eventKey={2}>Categories</NavItem>
                        </LinkContainer >
                        <LinkContainer  to='/about'>
                            <NavItem eventKey={3}>About</NavItem>
                        </LinkContainer >
                    </Nav>
                </Navbar>

                <div> {this.props.children} </div>
            </div>
        )
    }

    componentDidMount() {

    }
}

const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({})


export default connect(mapStateToProps, mapDispatchToProps)(App);
