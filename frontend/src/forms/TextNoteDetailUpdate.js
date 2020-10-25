import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class TextNoteDetailUpdate extends React.Component {

  handleFormSubmit = (event, TextNoteID)=>{
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    console.log(title,content);
    axios.put(`http://127.0.0.1:8000/api/TextNotes/${TextNoteID}/`, {
        title: title,
        content: content
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));
    }


render(){
  return (
      <div>
      <h1>TextNoteDetailUpdate.js</h1>
        <form onSubmit={(event)=>this.handleFormSubmit(event,
          this.props.TextNoteID,
          this.props.TextNoteContent,
          this.props.TextNoteTitle)}>
          <Form.Item label="title">
          {
            this.props.TextNoteID ? (
              <Input name="title" value = {this.props.TextNoteTitle}/>

            ):
              <Input name="title" placeholder="Put a title here"/>
          }

          </Form.Item>
          <Form.Item label="content">
          {
            this.props.TextNoteID ? (
              <TextArea rows={9} name="content" value={this.props.TextNoteContent} />
            ):
              <TextArea rows={9} name="content" placeholder="write some content here" />
          }
          </Form.Item>
          <Form.Item>
            <button type="submit">Submit</button>
          </Form.Item>
        </form>
      </div>
    );
  }
}

export default TextNoteDetailUpdate;
