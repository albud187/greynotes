import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { List,Card } from 'antd';

class ListNoteDetailUpdateView extends React.Component {

  state ={
    note_groups: [],
    list_note: {},
    list_note_entrys: [],
  }
  componentDidMount(){
    const listnotetID = this.props.listnotetID
    axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +listnotetID)
    .then(result => {this.setState({
        list_note_entrys: result.data
        });
        console.log(result.data)
  })

    console.log('from detailupdate view- listnoteid is ' + listnotetID)
  }

    render(){
        return(
      <div>
      <p>from props: {this.props.listnoteid}</p>

      <List
        dataSource={this.state.list_note_entrys}
        bordered
        renderItem={item => (
          <List.Item key={item.id}>
          <List.Item.Meta
          title={item.entry_text}/>
          </List.Item>
          )}
  />

      </div>
    )
  }
}

export default ListNoteDetailUpdateView
