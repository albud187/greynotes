import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import MemeTextOutput from './MemeTextOutput.js'
const { TextArea } = Input;

const output_data = 1

class MemeTextGen extends Component {
  state ={
    memed_text: {}

  }


  HandleMemeGenSubmit = (event)=>{
    event.preventDefault()
    const textToMeme = event.target.elements.textToMeme.value;
    console.log(textToMeme);
    axios.get('http://127.0.0.1:8000/api/meme_text'+
    '?textToMeme='+textToMeme, {
      textToMeme: textToMeme
    })
    .then(res => {
    this.setState({
      memed_text: res.data.complex_result
    });
    console.log("result is " + this.state.memed_text)
  });


  }

render(){
  return (
      <div>
      {
        this.state.memed_text ?
        (<Form.Item label="output">
            <TextArea rows={9} name="output" value={this.state.memed_text} />
        </Form.Item>) :
        <Form.Item label="output">

            <form rows={9} name="output" placeholder="output text" />
        </Form.Item>
      }
        <form onSubmit={(event)=>this.HandleMemeGenSubmit(event,
        )}>



          <Form.Item label="input">
              <TextArea rows={9} name="textToMeme" placeholder="TEXT TO MEMEMIFY" />
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
