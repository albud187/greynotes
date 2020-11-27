import React from 'react'
import axios from 'axios';
import {Button, Card} from 'antd'
import ListNoteDetailUpdateView from '../forms/ListNoteDetailUpdateView.js'

class ListNoteDetailView extends React.Component {
  state ={
    listnote: {},
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
    this.fetchUserId()
    const listnoteID = this.props.match.params.listnoteID;
    axios.get(`http://127.0.0.1:8000/api/ListNotes/${listnoteID}/`)
      .then(res => {
      this.setState({
        listnote: res.data
      });
      console.log(this.state.listnote.id +' - '+ this.state.listnote.title)
    });
  }

  handleDelete = (event) => {
      event.preventDefault()
      const listnoteID = this.props.match.params.listnoteID;

      axios.delete(`http://127.0.0.1:8000/api/ListNotes/${listnoteID}/`)
        this.forceUpdate();
        this.props.history.push('/list_note_list');
        this.forceUpdate();
    }

  render() {
    return (
      <div>
      {this.state.listnote.author == this.state.userid ?
        <ListNoteDetailUpdateView
        listnotetID={this.props.match.params.listnoteID}
        listnotetitle = {this.state.listnote.title}
        />
        :
        <h1>You are not logged in as the correct user</h1>
      }

      {this.state.listnote.author == this.state.userid ?
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

export default ListNoteDetailView
