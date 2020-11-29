import React from 'react';
import axios from 'axios';

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

class TextNoteCreate extends React.Component {
  state ={
    note_groups: [],
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

  handleFormSubmit = (event)=>{
    event.preventDefault()
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const notegroup = event.target.elements.notegroup.value
    console.log(title,content);
    axios.post(`${API_PATH}api/TextNotes/`, {
      title: title,
      content: content,
      note_group: notegroup,
      author: this.state.userid
    })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));
      this.props.history.push('text_note_list')


  }

render(){
  return (
      <div>
      <h1>New Text Note</h1>
        <form onSubmit={(event)=>this.handleFormSubmit(event)}>
          <p><strong>Title</strong></p>
              <textarea rows="1" cols="50" name="title" placeholder="title"/>
          <p><strong>Content</strong></p>
              <textarea rows="9" cols="50" name="content" placeholder="content" />
              <br></br>
          <label for="notegroup"><strong>Note Group: </strong></label>
            <select name="notegroup" id="notegroup">
            <option value="">_ungrouped_</option>
            {this.state.note_groups.map((val)=>(
              <option value={val.id}>{val.group_name}</option>
            ))}

            </select>

            <br></br>
            <br></br>
            <button type="submit">Submit</button>

        </form>

      </div>
    )
  }
}

export default TextNoteCreate;
