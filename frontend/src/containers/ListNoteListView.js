import React from 'react'
import axios from 'axios';

import {Link} from 'react-router-dom'
import ListNotes from '../components/ListNotes.js'
class ListNoteListView extends React.Component{

  state ={
    list_notes: []
  }

  fetchListNotes = () => {
    axios.get("http://127.0.0.1:8000/api/ListNotes/").then(res => {
      this.setState({
        list_notes: res.data
      });
      console.log(res.data)
    });
  }

  componentDidMount() {
    this.fetchListNotes();
  }

  render(){
    return(
      <div>
      <h1> TextNoteListView.js</h1>
      <h2><Link to="/">New List Note</Link></h2>

      <ListNotes data ={this.state.list_notes}/>

      </div>
    )
  }
}

export default ListNoteListView
