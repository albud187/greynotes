import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import MemeTextOutput from './MemeTextOutput.js'
const { TextArea } = Input;

const output_data = 1

class MemeTextGen extends Component {

  HandleMemeGenSubmit = (event)=>{
    event.preventDefault()
    const textToMeme = event.target.elements.textToMeme.value;
    const otherInput = event.target.elements.otherInput.value;
    console.log(textToMeme);
    axios.get('http://127.0.0.1:8000/api/meme_text'+
    '?textToMeme='+textToMeme+otherInput, {
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

          <Form.Item label="input">
              <TextArea rows={9} name="textToMeme" placeholder="TEXT TO MEMEMIFY" />
          </Form.Item>
          <Form.Item label="input">
              <TextArea rows={9} name="otherInput" placeholder="TEXT TO MEMEMIFY" />
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
