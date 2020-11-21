import React from 'react'
import axios from 'axios';
import {Button, Card} from 'antd'
import TextNoteDetailUpdate from '../forms/TextNoteDetailUpdate.js'

class TextNoteDetail extends React.Component{

  state ={
    textnote: {},
    userid:''
  }

  fetchUserId = () => {
    axios.get(`http://127.0.0.1:8000/api/Tokens/${localStorage['token']}/`).then(result=>{
      this.setState({
        userid:result.data.user
      })
    })
  }


  componentDidMount() {
    this.fetchUserId();
      const textnoteID = this.props.match.params.textnoteID;
      axios.get(`http://127.0.0.1:8000/api/TextNotes/${textnoteID}/`)
        .then(res => {
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


      {this.state.textnote.author == this.state.userid?
      <TextNoteDetailUpdate
        requestType="put"
        textnoteID={this.props.match.params.textnoteID}
        textnoteContent={this.state.textnote.content}
        textnoteTitle = {this.state.textnote.title}/>
      :
      <h1> You are not logged in as the correct user</h1>

    }

    {this.state.textnote.author == this.state.userid ?

    <form onSubmit={(event)=>this.handleDelete(event)}>
      <Button type='danger' htmlType='submit'>Delete</Button>
    </form>
    :
    <h1> </h1>
    }


      </div>

    )
  }
}

export default TextNoteDetail
