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

  handleListItemEdit =(event,itemID,parentlist)=>{
    event.preventDefault()
    const listentry = event.target.elements.listentry.value;

    console.log(listentry, parentlist)
    axios.put(`http://127.0.0.1:8000/api/ListNoteEntrysAll/${itemID}/`,{
      entry_text:listentry,
      parent_list:parentlist,

    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
    alert('note updated')

  }

  handleAddentry
  handleEntryDelete


    render(){
        return(
      <div>
      <List
        dataSource={this.state.list_note_entrys}
        bordered
        renderItem={item => (
            <form onSubmit={(event,itemID,parentlist)=>this.handleListItemEdit(event,item.id,item.parent_list)}>
              <textarea rows="1" cols="50" name="listentry" defaultValue = {item.entry_text}/>
              <button type="submit">Edit</button>
            </form>


          )}
          />

          <form>
          <textarea rows="1" cols="50" name="newlistentry" placeholder='new list item'/>
          <button type="submit">Add</button>
          </form>

      </div>
    )
  }
}

export default ListNoteDetailUpdateView
