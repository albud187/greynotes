import React from 'react'
import axios from 'axios';
import {Button, Card} from 'antd'
import CustomForm from '../components/Form'
import TextNoteDetailUpdate from '../forms/TextNoteDetailUpdate.js'

class TextNoteDetail extends React.Component{

  state ={
    TextNote: {}

  }

  componentDidMount() {
      const TextNoteID = this.props.match.params.TextNoteID;
      axios.get(`http://127.0.0.1:8000/api/TextNotes/${TextNoteID}/`).then(res => {
        this.setState({
          TextNoteID: res.data.id

        });
        console.log(this.state.TextNote.title)
      });
      console.log('test')
    }


    handleDelete = (event) => {
      const TextNoteID = this.props.match.params.TextNoteID;
      axios.delete(`http://127.0.0.1:8000/api/${TextNoteID}/`)
        this.props.history.push('/');
        this.forceUpdate();
    }

  render(){
    return(
      <div>
      <h1>TextNoteDetailView.js</h1>

      <TextNoteDetailUpdate
        requestType="put"
        TextNoteID={this.props.match.params.TextNoteID}
        TextNoteContent={this.state.TextNote.content}
        TextNoteTitle = {this.state.TextNote.title}/>

      <form onSubmit={this.handleDelete}>
        <Button type='danger' htmlType='submit'>Delete</Button>
      </form>


      </div>




    )
  }
}

export default TextNoteDetail
