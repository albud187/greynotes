import React, { Component } from 'react'
import axios from 'axios'

class NoteGroupEdit extends Component {

  state ={
    note_groups:[]
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

  handleGroupRename =(event)=>{
    event.preventDefault()
    const notegroup = event.target.elements.notegroup.value;
    const newgroupname = event.target.elements.newgroupname.value;
    axios.put(`http://127.0.0.1:8000/api/NoteGroups/${notegroup}/`,{
      group_name:newgroupname

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
