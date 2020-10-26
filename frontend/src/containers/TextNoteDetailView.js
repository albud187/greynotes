import React from 'react'
import axios from 'axios';
import {Button, Card} from 'antd'
import CustomForm from '../components/Form'
import TextNoteDetailUpdate from '../forms/TextNoteDetailUpdate.js'

class TextNoteDetail extends React.Component{

  state ={
    textnote: {}

  }

  componentDidMount() {
      const textnoteID = this.props.match.params.textnoteID;
      axios.get(`http://127.0.0.1:8000/api/TextNotes/${textnoteID}/`).then(res => {
        this.setState({
          textnote: res.data
        });
        console.log(this.state.textnote.title)
      });
      console.log('test')
    }


    handleDelete = (event) => {
      event.preventDefault()
      const textnoteID = this.props.match.params.textnoteID;
      axios.delete(`http://127.0.0.1:8000/api/TextNotes/${textnoteID}/`)
        this.forceUpdate();
        this.props.history.push('/text_note_list');
        this.forceUpdate();
    }

  render(){
    return(
      <div>
      <h1>textnoteDetailView.js</h1>

      <TextNoteDetailUpdate
        requestType="put"
        textnoteID={this.props.match.params.textnoteID}
        textnoteContent={this.state.textnote.content}
        textnoteTitle = {this.state.textnote.title}/>

      <form onSubmit={(event)=>this.handleDelete(event)}>
        <Button type='danger' htmlType='submit'>Delete</Button>
      </form>


      </div>




    )
  }
}

export default TextNoteDetail
