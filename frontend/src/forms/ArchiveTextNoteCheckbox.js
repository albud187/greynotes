import React from 'react'
import { Checkbox, Button } from 'antd';
import axios from 'axios'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

function TrueorFalse(input) {
  if (input = false){
    return(0)
  }
  if (input = true){
    return(1)
  }

}

class ArchiveTextNoteCheckbox extends React.Component {

  state = {
    checked: this.props.data.archived,

  };

  onCheck = (event,noteID) =>{
    event.preventDefault()
    axios.put(`${API_PATH}api/TextNotes/${noteID}/`,{
      archived: event.target.checked,
      author: this.props.data.author,
      title: this.props.data.title,
      content: this.props.data.content
    })
    this.setState({
      checked: event.target.checked,
    });
    console.log(event.target.checked)
  }

  render() {

    return (
      <>
        <p style={{ marginBottom: '20px' }}>
          <Checkbox
            checked={this.state.checked}
            onChange={(event,noteID)=>this.onCheck(event,this.props.data.id)}
          >
          </Checkbox>
        </p>

      </>
    );
  }
}

export default ArchiveTextNoteCheckbox
