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

class ListNoteTaskCheckbox extends React.Component {

  state = {
    checked: this.props.data.completed,
    testentry: this.props.data.entry_text

  };

  onCheck = (event,listentryID) =>{
    event.preventDefault()
    axios.put(`${API_PATH}api/ListNoteEntrysAll/${listentryID}/`,{
      parent_list: this.props.data.parent_list,
      completed: event.target.checked,
      author:this.props.data.author

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
            onChange={(event,listentryID)=>this.onCheck(event,this.props.data.id)}
          >
          </Checkbox>
        </p>

      </>
    );
  }
}

export default ListNoteTaskCheckbox
