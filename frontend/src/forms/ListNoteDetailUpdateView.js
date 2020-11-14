import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { List,Card } from 'antd';
import { Checkbox } from 'antd';
import ListNoteTaskCheckbox from './ListNoteTaskCheckbox.js'
import { Row, Col } from 'antd';


class ListNoteDetailUpdateView extends React.Component {

  state ={
    note_groups: [],
    list_note: {},
    list_note_entrys: [],
    list_note_actual:{}
  }

  fetchNoteGroups = () => {
    axios.get("http://127.0.0.1:8000/api/notegroups_by_user?userid="+localStorage['userid'])
    .then(result => {this.setState({
        note_groups: result.data
      });
      console.log(result.data)
    });
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

  }

  handleAddEntry = (event,parentlist) =>{
    event.preventDefault()
    const newlistentry = event.target.elements.newlistentry.value;
    axios.post('http://127.0.0.1:8000/api/ListNoteEntrysAll/',{
      entry_text:newlistentry,
      parent_list:parentlist,
    })

    axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +parentlist)
    .then(result =>{this.setState({
      list_note_entrys: result.data,
      list_note:this.props.listnotetID
    });
    })

    axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +parentlist)
    .then(result =>{this.setState({
      list_note_entrys: result.data,
      list_note:this.props.listnotetID
    });
    })
  }

  handleEntryDelete = (event,listentryID,parentlist) =>{
    event.preventDefault()
    axios.delete(`http://127.0.0.1:8000/api/ListNoteEntrysAll/${listentryID}/`)

      axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +parentlist)
      .then(result =>{this.setState({
        list_note_entrys: result.data,
        list_note:this.props.listnotetID
      });
      })

      axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +parentlist)
      .then(result =>{this.setState({
        list_note_entrys: result.data,
        list_note:this.props.listnotetID
      });
      })

      axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +parentlist)
      .then(result =>{this.setState({
        list_note_entrys: result.data,
        list_note:this.props.listnotetID
      });
      })

  }



  handleTitleAndGroup = (event) =>{
    event.preventDefault()
    const title = event.target.elements.title.value;
    const notegroup = event.target.elements.notegroup.value
    axios.put(`http://127.0.0.1:8000/api/ListNotes/${this.props.listnotetID}/`, {
    title: title,
    note_group: notegroup
  })
  .then(res=>console.log(res))
  .catch(err=>console.log(err));
  alert('note updated')
  }

  componentDidMount(){
    this.fetchNoteGroups();
    const listnotetID = this.props.listnotetID
    axios.get('http://127.0.0.1:8000/api/ListNoteEntrysList/?parentlist=' +listnotetID)
    .then(result => {this.setState({
        list_note_entrys: result.data,
        list_note:this.props.listnotetID
        });
  })
    axios.get(`http://127.0.0.1:8000/api/ListNotes/${this.props.listnotetID}/`)
      .then(result =>{this.setState({
        list_note_actual:result.data
      })})

  }

    render(){
        return(
      <div>

      <form onSubmit={(event)=>this.handleTitleAndGroup(event)}>
      <p>Title { this.state.list_note.note_group}</p>
        <textarea rows="1" cols="50" name="title" defaultValue = {this.props.listnotetitle}/>
      <select name="notegroup" id="notegroup">
            <option value="">_ungrouped_</option>
            {this.state.note_groups.map((val)=>(
              val.id == this.state.list_note_actual.note_group ? (
                <option value={val.id} selected >{val.group_name}</option>
              ):
              <option value={val.id}>{val.group_name}</option>
            ))}
      </select>
      <button type="submit">Update</button>
      </form>
      <Row>
      <Col span={120}>

      <List
        dataSource={this.state.list_note_entrys}
        bordered
        renderItem={item => (
          <Row>
          <List.Item key={item.id}>
          <Col span ={1}>
          <ListNoteTaskCheckbox data={item} style={{ position: 'relative', xIndex: 2, width: '10%' }}></ListNoteTaskCheckbox>
          </Col>

          <Col span ={20}>
            <form
            onSubmit={(event,itemID,parentlist)=>this.handleListItemEdit(event,item.id,item.parent_list)}>

              <textarea rows="1" cols="60" name="listentry" defaultValue = {item.entry_text}/>
              <button type="submit">*UPDATE*</button>

            </form>
          </Col>

          <Col span={1}>
            <form
            onSubmit = {(event,listentryID,parentlist)=>this.handleEntryDelete(event,item.id,item.parent_list)}>
              <button type="submit">*DELETE*</button>
            </form>
          </Col>


            </List.Item>
            </Row>


          )}
          />
          </Col>
          </Row>

          <form onSubmit={(event,parentlist)=>this.handleAddEntry(event,this.state.list_note)}>
          <textarea rows="1" cols="50" name="newlistentry" placeholder='new list item'/>
          <button type="submit">*ADD*</button>
          </form>

      </div>
    )
  }
}

export default ListNoteDetailUpdateView
