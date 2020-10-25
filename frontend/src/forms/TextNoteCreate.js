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
      this.props.history.push('/');
      this.forceUpdate();
  }

render(){
  return (
      <div>
      <h1>TextNoteCreate.js</h1>
        <form onSubmit={(event)=>this.handleFormSubmit(event,
          this.props.requestType,
        )}>
          <Form.Item label="title">
              <Input name="title" placeholder="Put a title here"/>
          </Form.Item>
          <Form.Item label="content">
              <TextArea rows={9} name="content" placeholder="NEW TEXT HERE" />
          </Form.Item>
          <Form.Item>
            <button type="submit">Submit</button>
          </Form.Item>
        </form>
      </div>
    );
  }
}

export default TextNoteCreate;
