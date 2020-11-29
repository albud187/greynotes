import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { List,Card } from 'antd';
import { Checkbox } from 'antd';
import { Row, Col } from 'antd';
import ListNoteTaskCheckbox from './ListNoteTaskCheckbox.js'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

const textstyle = {
  position: "relative",

}

const updatestyle = {
     position: "relative",
     left: "25px",
     bottom:"10px"

   };

const delstyle ={
  position: "relative",
  left: "25px",
  bottom:"5px"
}

const rowstyle = {
  marginBottom: '-4%'
}

class ListNoteDetailUpdateView extends React.Component {

  state ={
    note_groups: [],
    list_note: {},
    list_note_entrys: [],
    list_note_actual:{},
    userid:''
  }

  fetchNoteGroups = () => {
    axios.get(`${API_PATH}api/notegroups_by_user?token=${localStorage['token']}`)
    .then(result => {this.setState({
        note_groups: result.data
      });
      console.log(result.data)
    });
  }

  fetchUserId = () => {
    axios.get(`${API_PATH}api/Tokens/${localStorage['token']}/`).then(result=>{
      this.setState({
        userid:result.data.user
      })
    })
  }


  handleListItemEdit =(event,itemID,parentlist)=>{
    event.preventDefault()
    const listentry = event.target.elements.listentry.value;
    console.log(listentry, parentlist)
    axios.put(`${API_PATH}api/ListNoteEntrysAll/${itemID}/`,{
      entry_text:listentry,
      parent_list:parentlist,
      author:this.state.userid

    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err));

  }

  handleAddEntry = (event,parentlist) =>{
    event.preventDefault()
    const newlistentry = event.target.elements.newlistentry.value;
    axios.post(`${API_PATH}api/ListNoteEntrysAll/`,{
      entry_text:newlistentry,
      parent_list:parentlist,
      author:this.state.userid
    })

    axios.get(`${API_PATH}api/ListNoteEntrysList/?parentlist=${parentlist}`)
    .then(result =>{this.setState({
      list_note_entrys: result.data,
      list_note:this.props.listnotetID
    });
    })

    axios.get(`${API_PATH}api/ListNoteEntrysList/?parentlist=${parentlist}`)
    .then(result =>{this.setState({
      list_note_entrys: result.data,
      list_note:this.props.listnotetID
    });
    })
  }

  handleEntryDelete = (event,listentryID,parentlist) =>{
    event.preventDefault()
    axios.delete(`${API_PATH}api/ListNoteEntrysAll/${listentryID}/`)

      axios.get(`${API_PATH}api/ListNoteEntrysList/?parentlist=${parentlist}`)
      .then(result =>{this.setState({
        list_note_entrys: result.data,
        list_note:this.props.listnotetID
      });
      })

      axios.get(`${API_PATH}api/ListNoteEntrysList/?parentlist=${parentlist}`)
      .then(result =>{this.setState({
        list_note_entrys: result.data,
        list_note:this.props.listnotetID
      });
      })

      axios.get(`${API_PATH}api/ListNoteEntrysList/?parentlist=${parentlist}`)
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
    axios.put(`${API_PATH}api/ListNotes/${this.props.listnotetID}/`, {
    title: title,
    note_group: notegroup,
    author:this.state.userid
  })
  .then(res=>console.log(res))
  .catch(err=>console.log(err));
  alert('note updated')
  }

  componentDidMount(){
    this.fetchUserId()
    this.fetchNoteGroups();
    const listnotetID = this.props.listnotetID
    axios.get(`${API_PATH}api/ListNoteEntrysList/?parentlist=${listnotetID}`)
    .then(result => {this.setState({
        list_note_entrys: result.data,
        list_note:this.props.listnotetID
        });
  })
    axios.get(`${API_PATH}api/ListNotes/${this.props.listnotetID}/`)
      .then(result =>{this.setState({
        list_note_actual:result.data
      })})

  }

    render(){
        return(
      <div>

      <form onSubmit={(event)=>this.handleTitleAndGroup(event)}>
      <p><strong>Title</strong></p>
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
        <p><strong>New List Note Item</strong></p>

      <form onSubmit={(event,parentlist)=>this.handleAddEntry(event,this.state.list_note)}>
      <textarea rows="1" cols="50" name="newlistentry" placeholder='new list item'/>
      <button type="submit">*ADD*</button>
      </form>
        <p><strong>List Note Items</strong></p>

      <Row>
        <Col span={120}>

        <List
          dataSource={this.state.list_note_entrys}
          bordered
          renderItem={item => (
            <Row style ={rowstyle}>
              <List.Item key={item.id}>
              <Col span ={1}>
              <ListNoteTaskCheckbox data={item} style={{ position: 'relative', xIndex: 2, width: '10%' }}></ListNoteTaskCheckbox>
              </Col>

              <Col span ={20}>

                <form
                onSubmit={(event,itemID,parentlist)=>this.handleListItemEdit(event,item.id,item.parent_list)}
                >
                <tr>
                <th>
                  <div style={textstyle}>
                    <textarea rows="1" cols="60" name="listentry" defaultValue = {item.entry_text}/>
                  </div>
                </th>
                <th>
                  <div style={updatestyle}>
                    <button type="submit">*UPDATE*</button>
                  </div>
                </th>
                </tr>
                </form>

              </Col>

              <Col span={1}>
              <div style={delstyle}>
                <form
                onSubmit = {(event,listentryID,parentlist)=>this.handleEntryDelete(event,item.id,item.parent_list)}>
                  <button type="submit">*DELETE*</button>
                </form>
              </div>
              </Col>
                </List.Item>
              </Row>
            )}
            />
            </Col>
          </Row>
          <br></br>



      </div>
    )
  }
}

export default ListNoteDetailUpdateView
