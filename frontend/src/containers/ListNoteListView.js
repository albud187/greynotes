import React from 'react'
import axios from 'axios';
import { Checkbox } from 'antd';
import {Link} from 'react-router-dom'
import ListNotes from '../components/ListNotes.js'

function checkArchived(entry){
  return(!entry['archived'])
}

class ListNoteListView extends React.Component{

  state ={
    all_list_notes: [],
    active_list_notes:[],
    list_archive_display:false,

  }

  fetchAllListNotes = () => {
    axios.get(`http://127.0.0.1:8000/api/list_notes_by_user/?token=${localStorage['token']}`).then(res => {
      this.setState({
        all_list_notes: res.data
      });
      console.log(res.data)
    });
  }

  fetchActiveListNotes = () => {
    axios.get(`http://127.0.0.1:8000/api/list_notes_by_user/?token=${localStorage['token']}`).then(res => {
      this.setState({
        active_list_notes: res.data.filter(checkArchived)
      });
      console.log(res.data)
    });
  }

  changeListArchiveDisplay = (event) => {
    const status = this.state.list_archive_display
    this.setState({
      list_archive_display: !status
    })
    console.log(status)
  }

  componentDidMount() {
    this.fetchAllListNotes();
    this.fetchActiveListNotes();
  }

  render(){
    return(
      <div>
      <h1>My List Notes</h1>
      <Checkbox
      checked={this.state.list_archive_display}
      onChange = {(event)=>this.changeListArchiveDisplay(event)}
      >
      Display Archived List Notes
      </Checkbox>

      <h2><Link to="/create_list">New List Note</Link></h2>

      {this.state.list_archive_display ?
        <ListNotes data ={this.state.all_list_notes}/>
        :
        <ListNotes data ={this.state.active_list_notes}/>
      }

      </div>
    )
  }
}

export default ListNoteListView
