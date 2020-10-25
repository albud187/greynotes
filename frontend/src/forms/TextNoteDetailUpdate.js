import React, { useState, setState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

class TextNoteDetailUpdate extends React.Component {



  handleFormSubmit = (event, textnoteID)=>{
    event.preventDefault()
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    console.log(title,content);
    axios.put(`http://127.0.0.1:8000/api/TextNotes/${textnoteID}/`, {
        title: title,
        content: content
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));
      alert('note updated')
    }

    state ={
      textnote: {}

    }
    componentDidMount() {
        const textnoteID = this.props.textnoteID;
        axios.get(`http://127.0.0.1:8000/api/TextNotes/${textnoteID}/`).then(res => {
          this.setState({
            textnote: res.data
          });
          console.log("component did mount "+this.state.textnote.title)
        });
      }

render(){
  return (
      <div>
      <h1>textnoteDetailUpdate.js</h1>
        <form onSubmit={(event, textnoteID)=>this.handleFormSubmit(event, this.props.textnoteID)}>
          <p>Title</p>
              <textarea rows="1" cols="50" name="title" defaultValue = {this.props.textnoteTitle}/>
          <p>Content</p>
              <textarea rows="9" cols="50" name="content" defaultValue={this.state.textnote.content} />
            <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default TextNoteDetailUpdate;
