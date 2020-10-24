import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

const output_data = 1

class MemeTextOutput extends Component {
  HandleMemeGenSubmit = (event)=>{
    event.preventDefault()
    const textToMeme = event.target.elements.textToMeme.value;
    const memedText = '123'
    console.log(textToMeme);
    axios.get('http://127.0.0.1:8000/api/meme_text'+'?textToMeme='+textToMeme, {
      textToMeme: textToMeme
    })

      .then(res=>alert(res.data.complex_result))
      .catch(err=>console.log(err));

  }

render(){
  return (
      <div>
        <form onSubmit={(event)=>this.HandleMemeGenSubmit(event,
        )}>

          <Form.Item label="result">
              <TextArea rows={9} name="textToMeme" placeholder="output is here" />
          </Form.Item>

        </form>
      </div>
    );
  }
}
export default MemeTextOutput
