import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class CustomForm extends React.Component {

  handleFormSubmit = (event, requestType, articleID)=>{
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    console.log(title,content);

    switch(requestType){
      case 'post': return axios.post('http://127.0.0.1:8000/api/', {
        title: title,
        content: content
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));

      case 'put': return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
        title: title,
        content: content
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));
    }
  }

render(){
  return (
      <div>
        <form onSubmit={(event)=>this.handleFormSubmit(event,
          this.props.requestType,
          this.props.articleID,
          this.props.articleContent,
          this.props.articleTitle)}>
          <Form.Item label="title">
          {
            this.props.articleID ? (
              <Input name="title" value = {this.props.articleTitle}/>

            ):
              <Input name="title" placeholder="Put a title here"/>
          }

          </Form.Item>
          <Form.Item label="content">
          {
            this.props.articleID ? (
              <TextArea rows={9} name="content" value={this.props.articleContent} />
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

export default CustomForm;
