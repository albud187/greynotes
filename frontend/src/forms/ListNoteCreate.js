import React from 'react';
import axios from 'axios';

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

class ListNoteCreate extends React.Component {
  state ={
    note_groups: [],
    userid:''
  }

  fetchNoteGroups = () => {
    axios.get(`${API_PATH}api/notegroups_by_user?token="${localStorage['token']}`).then(result => {
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

  handleFormSubmit = (event)=>{
  event.preventDefault()
  const title = event.target.elements.title.value;
  const notegroup = event.target.elements.notegroup.value
  console.log(title);
  axios.post(`${API_PATH}api/ListNotes/`, {
    title: title,
    note_group: notegroup,
    author: this.state.userid
  })
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
    console.log(title)
    console.log(notegroup)
    this.props.history.push('list_note_list')


}

  render() {
    return (
      <div>
      <h1>New List Note</h1>

      <form onSubmit={(event)=>this.handleFormSubmit(event)}>
      <p><strong>Title</strong></p>
    <textarea rows="1" cols="50" name="title" placeholder="title"/>

    <label for="notegroup"><strong>Note Group: </strong></label>
      <select name="notegroup" id="notegroup">
      <option value="">_ungrouped_</option>
      {this.state.note_groups.map((val)=>(
        <option value={val.id}>{val.group_name}</option>
      ))}

        </select>
        <button type='submit'>submit</button>
      </form>

      </div>
    )
  }
}

export default ListNoteCreate
