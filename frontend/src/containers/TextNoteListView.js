import React from 'react'
import axios from 'axios';
import { connect } from "react-redux";
import { Checkbox } from 'antd';

import TextNotes from '../components/TextNotes.js'
import {Link} from 'react-router-dom'
class TextNoteListView extends React.Component{

  state ={
    text_notes: [],
    text_archive_display:false,
    text_notes_active:[]
  }

  fetchTextNotes = () => {
    axios.get(`http://127.0.0.1:8000/api/text_notes_by_user?userid=${localStorage['userid']}`).then(res => {
      this.setState({
        text_notes: res.data
      });
      console.log(res.data)
    });
  }

  changeTextArchiveDisplay = (event) => {
    event.preventDefault()
    console.log('status changed')
  }

  componentDidMount() {

    this.fetchTextNotes();
  }

  render(){
    return(
      <div>
      <h1> TextNoteListView.js</h1>
        <h1>

          <Checkbox
          onChange = {(event)=>this.changeTextArchiveDisplay(event)}
          >
          Display Archived Text Notes

          </Checkbox>
        </h1>


      <p> add visual fx on new note button </p>

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
