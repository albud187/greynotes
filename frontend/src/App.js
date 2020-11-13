import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import {connect} from 'react-redux'
import BaseRouter from './routes';
import 'antd/dist/antd.css'
import CustomLayout from './containers/Layout.js'

import * as actions from './store/actions/auth.js'

class App extends Component {
  render(){
  return (
      <div className="App">

      <Router>
        <CustomLayout {...this.props}>
          <BaseRouter/>
        </CustomLayout>
      </Router>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutosignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
