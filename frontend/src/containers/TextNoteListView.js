import React from 'react'
import axios from 'axios';
import { connect } from "react-redux";

import TextNotes from '../components/TextNotes.js'
import {Link} from 'react-router-dom'
class TextNoteListView extends React.Component{

  state ={
    text_notes: []
  }

  fetchTextNotes = () => {
    axios.get(`http://127.0.0.1:8000/api/text_notes_by_user?userid=${localStorage['userid']}`).then(res => {
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

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps) (TextNoteListView)
