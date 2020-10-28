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

  render() {
    return (
      <div>ListNoteDetailView.js
      <p>{this.props.match.params.listnoteID} - {this.state.listnote.title}</p>
      <ListNoteDetailUpdateView
        listnotetID={this.props.match.params.listnoteID}
        listnotetitle = {this.state.listnote.title}
        />
      </div>


    )
  }
}

export default ListNoteDetailView
