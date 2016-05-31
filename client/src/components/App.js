import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends React.Component {

    render() {
        return (
            <div>
                <Link to="/about">About</Link>
            {this.props.children}
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
