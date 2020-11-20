import React from 'react'
import axios from 'axios';
import { connect } from "react-redux";
import { Checkbox } from 'antd';

import TextNotes from '../components/TextNotes.js'
import {Link} from 'react-router-dom'

function checkArchived(entry){
  return(!entry['archived'])
}

class TextNoteListView extends React.Component{

  state ={
    active_text_notes: [],
    text_archive_display:false,
    all_text_notes:[]
  }

  fetchActiveTextNotes = () => {
    axios.get(`http://127.0.0.1:8000/api/text_notes_by_user?token=${localStorage['token']}`).then(res => {
      this.setState({
        active_text_notes: res.data.filter(checkArchived)
      });
      console.log(res.data)
    });
  }

  fetchAllTextNotes = () => {
    axios.get(`http://127.0.0.1:8000/api/text_notes_by_user?token=${localStorage['token']}`).then(res => {
      this.setState({
        all_text_notes: res.data
      });
      console.log(res.data)
    });
  }

  changeTextArchiveDisplay = (event) => {
    const status = this.state.text_archive_display
    this.setState({
      text_archive_display: !status
    })
    console.log(status)
  }

  componentDidMount() {
    this.fetchAllTextNotes();
    this.fetchActiveTextNotes();
  }

  render(){
    return(
      <div>
      <h1> TextNoteListView.js</h1>
        <h1>

          <Checkbox
          checked={this.state.text_archive_display}
          onChange = {(event)=>this.changeTextArchiveDisplay(event)}
          >
          Display Archived Text Notes

          </Checkbox>
        </h1>


      <p> add visual fx on new note button </p>

      <h2><Link to="/create_note">New Note</Link></h2>

      {this.state.text_archive_display ?
        <TextNotes data ={this.state.all_text_notes}/>
        :
        <TextNotes data ={this.state.active_text_notes}/>
      }


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
