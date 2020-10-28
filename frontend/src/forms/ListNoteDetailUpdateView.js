import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';


class ListNoteDetailUpdateView extends React.Component {

  state ={
    note_groups: [],
    list_note: {},
    list_note_entrys: [],
  }
  componentDidMount(){
    const listnotetID = this.props.listnotetID
    axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +listnotetID)
    console.log('from detailupdate view- listnoteid is ' + listnotetID)
  }
    render(){
        return(
      <div>
      <p>from props: {this.props.listnoteid}</p>
    ListNoteDetailUpdateView.js

      </div>
    )
  }
}

export default ListNoteDetailUpdateView
