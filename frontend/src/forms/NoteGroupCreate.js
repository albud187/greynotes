import React, { Component } from 'react'
import axios from 'axios'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

class NoteGroupCreate extends Component {

  state ={
    userid:''
  }

  handleFormSubmit = (event)=>{
    const notegroup = event.target.elements.notegroup.value
    axios.post(`${API_PATH}api/NoteGroups/`,{
      group_name:notegroup,
      author:this.state.userid
    })
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
