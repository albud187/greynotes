import React, { Component } from 'react'
import axios from 'axios'
class NoteGroupCreate extends Component {

  handleFormSubmit = (event)=>{
    event.preventDefault()
    const notegroup = event.target.elements.notegroup.value
    axios.post('http://127.0.0.1:8000/api/NoteGroups/',{
      group_name:notegroup,
      author:localStorage['userid']
    })
  }

  render() {
    return (
      <div>

      <form onSubmit ={(event)=>this.handleFormSubmit(event)}>
        <textarea rows="1" cols="50" name="notegroup" placeholder="New Note Group"/>
        <button type='submit'>add new group</button>
      </form>
      </div>
    )
  }
}

export default NoteGroupCreate
