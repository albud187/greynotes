import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css'
import BaseRouter from './routes';
import CustomLayout from './containers/Layout.js'
import ArticleList from './containers/ArticleListView'

class App extends Component {
  render(){
  return (
    <div className="App">

    <Router>
      <CustomLayout>
        <BaseRouter/>
      </CustomLayout>
    </Router>
    </div>
  );
}
}
export default App
