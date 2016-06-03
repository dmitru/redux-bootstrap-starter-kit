import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from './Layout'

const App = ({ children }) => (
  <div>
    <Layout>
      <div> {children} </div>
    </Layout>
  </div>
)

App.propTypes = {
  children: React.PropTypes.element,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
