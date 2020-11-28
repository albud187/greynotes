import React, { Component } from 'react'
import axios from 'axios'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

class NoteGroupDelete extends Component {

  state ={
    note_groups:[]
  }

  fetchNoteGroups = () => {
  axios.get("http://127.0.0.1:8000/api/notegroups_by_user?token="+localStorage['token']).then(result => {
    this.setState({
      note_groups: result.data
    });
    console.log(result.data)
  });
}

componentDidMount() {
    this.fetchNoteGroups();
  }

  handleDelete=(event) => {
    event.preventDefault()
    const notegroup = event.target.elements.notegroup.value
    axios.delete(`http://127.0.0.1:8000/api/NoteGroups/${notegroup}/`)
  }

  render() {
    return (
      <div>

      <form onSubmit ={(event)=>this.handleDelete(event)}>
      <label for="notegroup">Delete </label>
        <select name="notegroup" id="notegroup">
        {this.state.note_groups.map((val)=>(
          <option value={val.id}>{val.group_name}</option>
        ))}

        </select>

        <button type="submit">Delete</button>

        </form>
        </div>



    )
  }
}

export default NoteGroupDelete
