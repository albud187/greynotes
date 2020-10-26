import React from 'react'
import axios from 'axios';

import TextNotes from '../components/TextNotes.js'
import {Link} from 'react-router-dom'
class TextNoteListView extends React.Component{

  state ={
    text_notes: []
  }

  fetchTextNotes = () => {
    axios.get("http://127.0.0.1:8000/api/TextNotes/").then(res => {
      this.setState({
        text_notes: res.data
      });
      console.log(res.data)
    });
  }

  componentDidMount() {
    this.fetchTextNotes();
  }

  render(){
    return(
      <div>
      <h1> TextNoteListView.js</h1>
      <h2><Link to="/create_note">New Note</Link></h2>

        <TextNotes data ={this.state.text_notes}/>

      </div>
    )
  }
}

export default TextNoteListView
