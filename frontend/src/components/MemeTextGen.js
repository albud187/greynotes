import React from 'react';
import { Component } from 'react';
import { Form } from 'antd';
import axios from 'axios';

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

class MemeTextGen extends Component {
  state ={
    memed_text: {}

  }


  HandleMemeGenSubmit = (event)=>{
    event.preventDefault()
    const textToMeme = event.target.elements.textToMeme.value;
    console.log(textToMeme);
    axios.get(API_PATH+'api/meme_text'+
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
            <textarea rows="9" cols="50" name="output" value={this.state.memed_text} />
        </Form.Item>) :
        <Form.Item label="output">

            <textarea rows="9" cols="50" name="output" placeholder="output text" />
        </Form.Item>
      }
        <form onSubmit={(event)=>this.HandleMemeGenSubmit(event,
        )}>



          <Form.Item label="input">
              <textarea rows="9" cols="50" name="textToMeme" placeholder="TEXT TO MEMEMIFY" />
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
