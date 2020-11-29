import React, { Component } from 'react'
import axios from 'axios'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

class NoteGroupEdit extends Component {

  state ={
    note_groups:[],
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
    this.fetchUserId()
    this.fetchNoteGroups();
  }

  handleGroupRename =(event)=>{
    const notegroup = event.target.elements.notegroup.value;
    const newgroupname = event.target.elements.newgroupname.value;
    axios.put(`${API_PATH}api/NoteGroups/${notegroup}/`,{
      group_name:newgroupname,
      author: this.state.userid


    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err));

  }


  render() {
    return (
      <div>

      <form onSubmit ={(event)=>this.handleGroupRename(event)}>
      <label for="notegroup">Rename </label>
        <select name="notegroup" id="notegroup">
        {this.state.note_groups.map((val)=>(
          <option value={val.id}>{val.group_name}</option>
        ))}

        </select>

        <textarea rows="1" cols="50" name="newgroupname"/>

        <button type="submit">Rename</button>

        </form>
        </div>

    )
  }
}

export default NoteGroupEdit
