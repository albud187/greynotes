import React from 'react'
import axios from 'axios';

import Articles from '../components/Article.js'
import CustomForm from '../components/Form.js'
import {Link} from 'react-router-dom'
class ArticleList extends React.Component{

  state ={
    articles: []
  }

  fetchArticles = () => {
    axios.get("http://127.0.0.1:8000/api/articles/").then(res => {
      this.setState({
        articles: res.data
      });
      console.log(res.data)
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }

  render(){
    return(
      <div>
      <h1> ArticleListView.js</h1>
      <h2><Link to="/create-article/">Create an  article</Link></h2>

        <Articles data ={this.state.articles}/>

      </div>
    )
  }
}

export default ArticleList
