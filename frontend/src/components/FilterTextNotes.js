import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import TextNotes from './TextNotes.js'
const { TextArea } = Input;

class FilterTextNotes extends Component {

  state ={
    note_groups: [],
    filtered_notes: []
  }

  fetchNoteGroups = () => {
    axios.get("http://127.0.0.1:8000/api/NoteGroups/").then(result => {
      this.setState({
        note_groups: result.data
      });
      console.log(result.data)
    });
  }
  componentDidMount() {
    this.fetchNoteGroups();
  }

  HandleTextNoteFilterSubmit = (event)=>{
    event.preventDefault()
    const groupname = event.target.elements.notegroup.value;
    console.log(groupname);
    axios.get('http://127.0.0.1:8000/api/query_text_notes'+
    '?groupname='+groupname, {
      groupname: groupname
    })
    .then(res => {
    this.setState({
      filtered_notes: res.data
    });
    console.log("result is " + this.state.filtered_notes)
  });
  }

render(){
  return (
      <div>

    <form  onSubmit={(event)=>this.HandleTextNoteFilterSubmit(event)}>
    <label for="notegroup">NoteGroup: </label>
      <select name="notegroup" id="notegroup">
      <option value="">ALL</option>
      {this.state.note_groups.map((val)=>(
        <option value={val.group_name}>{val.group_name}</option>
      ))}

      </select>

      <button type="submit">Filter</button>

      <TextNotes data ={this.state.filtered_notes}/>
      </form>
      </div>
    );
  }
}
export default FilterTextNotes
