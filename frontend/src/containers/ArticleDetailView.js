import React from 'react'
import Articles from '../components/Article.js'
import axios from 'axios';
import {Button, Card} from 'antd'
import CustomForm from '../components/Form'
import TextNoteDetailUpdate from '../forms/TextNoteDetailUpdate.js'

class ArticleDetail extends React.Component{

  state ={
    article: {}

  }

  componentDidMount() {
      const articleID = this.props.match.params.articleID;
      axios.get(`http://127.0.0.1:8000/api/${articleID}/`).then(res => {
        this.setState({
          article: res.data
        });
        console.log(this.state.article.title)
      });
      console.log('test')
    }


    handleDelete = (event) => {
      const articleID = this.props.match.params.articleID;
      axios.delete(`http://127.0.0.1:8000/api/${articleID}/`)
        this.props.history.push('/');
        this.forceUpdate();
    }

  render(){
    return(
      <div>
      <h1>ArticleDetailView.js</h1>

      <TextNoteDetailUpdate
        requestType="put"
        articleID={this.props.match.params.articleID}
        articleContent={this.state.article.content}
        articleTitle = {this.state.article.title}/>

      <form onSubmit={this.handleDelete}>
        <Button type='danger' htmlType='submit'>Delete</Button>
      </form>


      </div>




    )
  }
}

export default ArticleDetail
