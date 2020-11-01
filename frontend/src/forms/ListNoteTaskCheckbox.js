import React from 'react'
import { Checkbox, Button } from 'antd';
import axios from 'axios'

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
    checked:this.props.data.completed,
    testentry: this.props.data.entry_text
  };

  onChange = e => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  };

  onCheck = (event,listentryID) =>{
    event.preventDefault()
    axios.put(`http://127.0.0.1:8000/api/ListNoteEntrysAll/${listentryID}/`,{
      completed: TrueorFalse(event.target.checked)
    })
    this.setState({
      checked: event.target.checked,
    });
    console.log(TrueorFalse(event.target.checked))
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
