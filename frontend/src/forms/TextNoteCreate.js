import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class TextNoteCreate extends React.Component {

  handleFormSubmit = (event)=>{
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    console.log(title,content);
    axios.post('http://127.0.0.1:8000/api/TextNotes/', {
      title: title,
      content: content
    })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));
      this.forceUpdate();
      this.props.history.push('/text_note_list');
      this.forceUpdate();
      this.props.history.push('/text_note_list')
      this.forceUpdate();
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
            <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default TextNoteCreate;
