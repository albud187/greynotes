import React from 'react';
import axios from 'axios';

class ListNoteCreate extends React.Component {
  state ={
    note_groups: [],
    userid:''
  }

  fetchNoteGroups = () => {
    axios.get("http://127.0.0.1:8000/api/notegroups_by_user?userid="+localStorage['userid']).then(result => {
      this.setState({
        note_groups: result.data
      });
      console.log(result.data)
    });
  }

  fetchUserId = () => {
    axios.get(`http://127.0.0.1:8000/api/Tokens/${localStorage['token']}/`).then(result=>{
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
  axios.post('http://127.0.0.1:8000/api/ListNotes/', {
    title: title,
    note_group: notegroup,
    author: this.state.userid

  })
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
    console.log(title)
    console.log(notegroup)



}

  render() {
    return (
      <div>
      <h1>ListNoteCreate.js</h1>

      <form onSubmit={(event)=>this.handleFormSubmit(event)}>
      <p>Title</p>
    <textarea rows="1" cols="50" name="title" placeholder="title"/>

    <label for="notegroup">NoteGroup: </label>
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
