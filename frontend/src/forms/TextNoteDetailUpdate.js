import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class TextNoteDetailUpdate extends React.Component {

  handleFormSubmit = (event, textnoteID)=>{
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    console.log(title,content);
    axios.put(`http://127.0.0.1:8000/api/textnotes/${textnoteID}/`, {
        title: title,
        content: content
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));
    }


render(){
  return (
      <div>
      <h1>textnoteDetailUpdate.js</h1>
        <form onSubmit={(event)=>this.handleFormSubmit(event,
          this.props.textnoteID,
          this.props.textnoteContent,
          this.props.textnoteTitle)}>
          <Form.Item label="title">
          {
            this.props.textnoteID ? (
              <Input name="title" value = {this.props.textnoteTitle}/>

            ):
              <Input name="title" placeholder="Put a title here"/>
          }

          </Form.Item>
          <Form.Item label="content">
          {
            this.props.textnoteID ? (
              <TextArea rows={9} name="content" value={this.props.textnoteContent} />
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
