import React from 'react'
import axios from 'axios';
import {Button, Card} from 'antd'
import ListNoteDetailUpdateView from '../forms/ListNoteDetailUpdateView.js'

class ListNoteDetailView extends React.Component {
  state ={
    listnote: {}

  }

  componentDidMount() {
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
      <div>ListNoteDetailView.js
      <p>{this.props.match.params.listnoteID} - {this.state.listnote.title}</p>
      <ListNoteDetailUpdateView
        listnotetID={this.props.match.params.listnoteID}
        listnotetitle = {this.state.listnote.title}
        />

        <form onSubmit={(event)=>this.handleDelete(event)}>
          <Button type='danger' htmlType='submit'>Delete</Button>
        </form>
      </div>


    )
  }
}

export default ListNoteDetailView
