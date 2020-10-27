import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class FilterTextNotes extends Component {
  state ={
    note_groups: [],
    filtered_notes: []
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


  HandleMemeGenSubmit = (event)=>{
    event.preventDefault()
    const textToMeme = event.target.elements.notegroup.value;
    console.log(groupname);
    axios.get('http://127.0.0.1:8000/api/query_text_notes'+
    '?groupname='+groupname, {
      groupname: groupname
    })
    .then(res => {
    this.setState({
      filtered_notes: res.data
    });
    console.log("result is " + this.state.filtered_notes
  });


  }

render(){
  return (
      <div>

      <label for="notegroup">NoteGroup: </label>
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

      {
        this.state.memed_text ?
        (<Form.Item label="output">
            <textarea rows="9" cols="50" name="output" value={this.state.memed_text} />
        </Form.Item>) :
        <Form.Item label="output">

            <textarea rows="9" cols="50" name="output" placeholder="output text" />
        </Form.Item>
      }
        <form onSubmit={(event)=>this.HandleMemeGenSubmit(event,
        )}>



          <Form.Item label="input">
              <textarea rows="9" cols="50" name="textToMeme" placeholder="TEXT TO MEMEMIFY" />
          </Form.Item>
          <Form.Item>
            <button type="submit">Submit</button>
          </Form.Item>
        </form>

      </div>
    );
  }
}
export default FilterTextNotes
