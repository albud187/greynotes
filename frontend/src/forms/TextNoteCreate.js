import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { List, Avatar, Space } from 'antd';

import axios from 'axios';
const { TextArea } = Input;

class TextNoteCreate extends React.Component {
  state ={
    note_groups: []
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

  handleFormSubmit = (event)=>{
    event.preventDefault()
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const notegroup = event.target.elements.notegroup.value
    console.log(title,content);
    axios.post('http://127.0.0.1:8000/api/TextNotes/', {
      title: title,
      content: content,
      note_group: notegroup
    })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));

  }

render(){
  return (
      <div>
      <h1>textnotecreate.js</h1>
        <form onSubmit={(event)=>this.handleFormSubmit(event)}>
          <p>Title</p>
              <textarea rows="1" cols="50" name="title" placeholder="title"/>
          <p>Content</p>
              <textarea rows="9" cols="50" name="content" placeholder="content" />
              <br></br>
          <label for="notegroup">NoteGroup: </label>
            <select name="notegroup" id="notegroup">
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
