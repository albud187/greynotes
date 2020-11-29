import React from 'react';
import { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextNotes from './TextNotes.js'
import ListNotes from './ListNotes.js'
import NoteGroupCreate from '../forms/NoteGroupCreate.js'
import NoteGroupDelete from '../forms/NoteGroupDelete.js'
import NoteGroupEdit from '../forms/NoteGroupEdit.js'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

class FilterTextNotes extends Component {

  state ={
    note_groups: [],
    filtered_notes: [],
    filtered_lists: [],
    userid:''

  }

  fetchNoteGroups = () => {
    axios.get(`${API_PATH}api/notegroups_by_user?token=${localStorage['token']}`).then(result => {
      this.setState({
        note_groups: result.data
      });
      console.log(result.data)
    });
  }

  fetchUserId = () => {
    axios.get(`${API_PATH}api/Tokens/${localStorage['token']}/`).then(result=>{
      this.setState({
        userid:result.data.user
      })
    })
  }

  componentDidMount() {
    this.fetchUserId();
    this.fetchNoteGroups();
  }

  HandleTextNoteFilterSubmit = (event)=>{
    event.preventDefault()
    const groupname = event.target.elements.notegroup.value;
    console.log(groupname);

    axios.get(API_PATH+'api/query_list_notes'+
    '?groupname='+groupname +'&userid='+this.state.userid, {
      groupname: groupname
    })
    .then(res => {
    this.setState({
      filtered_lists: res.data
    });
    console.log("result is " + this.state.filtered_lists)
  });

    axios.get(API_PATH+'api/query_text_notes'+
    '?groupname='+groupname+'&userid='+this.state.userid, {
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
      <NoteGroupCreate />
      <NoteGroupDelete />
      <NoteGroupEdit />
    <form  onSubmit={(event)=>this.HandleTextNoteFilterSubmit(event)}>
    <label htmlFor="notegroup">Filter </label>
      <select name="notegroup" id="notegroup">
      <option value="">ALL</option>
      {this.state.note_groups.map((val)=>(
        <option value={val.group_name}>{val.group_name}</option>
      ))}

      </select>


      <button type="submit">Filter</button>
      <h1> Text Notes <Link to="/create_note">(New Text Note)</Link> </h1>
      <TextNotes data ={this.state.filtered_notes}/>
      <h1> List Notes <Link to="/create_list">(New List Note)</Link> </h1>
      <ListNotes data = {this.state.filtered_lists}/>
      </form>
      </div>
    );
  }
}
export default FilterTextNotes
