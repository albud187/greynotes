import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class MemeTextGen extends Component {
  HandleMemeGenSubmit = (event)=>{
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    console.log(title,content);
    axios.post('http://127.0.0.1:8000/api/', {
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
        <form onSubmit={(event)=>this.HandleMemeGenSubmit(event,
          this.props.requestType,
        )}>

          <Form.Item label="content">
              <TextArea rows={9} name="content" placeholder="TEXT TO MEMEMIFY" />
          </Form.Item>
          <Form.Item>
            <button type="submit">Submit</button>
          </Form.Item>
        </form>
      </div>
    );
  }
}
export default MemeTextGen
