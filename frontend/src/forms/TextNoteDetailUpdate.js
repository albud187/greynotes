import React from 'react';
import { Input } from 'antd';
import axios from 'axios';


class TextNoteDetailUpdate extends React.Component {
  state ={
    note_groups: [],
    textnote: {},
    userid:''
  }

  fetchNoteGroups = () => {
    axios.get("http://127.0.0.1:8000/api/notegroups_by_user?token="+localStorage['token'])
    .then(result => {this.setState({
        note_groups: result.data
      });
      console.log(result.data)
    });
  }

  fetchUserId = () => {
    axios.get(`http://127.0.0.1:8000/api/Tokens/${localStorage['token']}/`).then(result=>{
      this.setState({
        userid:result.data.user
      })
    })
  }

  handleFormSubmit = (event, textnoteID)=>{
    event.preventDefault()
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const notegroup = event.target.elements.notegroup.value

    console.log(title,content);
    axios.put(`http://127.0.0.1:8000/api/TextNotes/${textnoteID}/`, {
        author: this.state.userid,
        title: title,
        content: content,
        note_group: notegroup
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err));
      alert('note updated')
    }

    componentDidMount() {
      this.fetchUserId()
      this.fetchNoteGroups();
        const textnoteID = this.props.textnoteID;
        axios.get(`http://127.0.0.1:8000/api/TextNotes/${textnoteID}/`).then(res => {
          this.setState({
            textnote: res.data
          });
          console.log("component did mount "+this.state.textnote.title)
        });
      }

render(){
  return (
      <div>
        <form onSubmit={(event, textnoteID)=>this.handleFormSubmit(event, this.props.textnoteID)}>
          <p><strong>Title</strong></p>
              <textarea rows="1" cols="80" name="title" defaultValue = {this.props.textnoteTitle}/>
          <p><strong>Content</strong></p>
              <textarea rows="9" cols="80" name="content" defaultValue={this.state.textnote.content} />
                <br/>
          <label for="notegroup"><strong>NoteGroup: </strong></label>


              <select name="notegroup" id="notegroup">
                <option value="">_ungrouped_</option>
                {this.state.note_groups.map((val)=>(
                  val.id == this.state.textnote.note_group ? (
                    <option value={val.id} selected >{val.group_name}</option>
                  ):
                  <option value={val.id}>{val.group_name}</option>
                ))}
              </select>
            <br/>
            <br/>
            <button type="submit">Update</button>
        </form>
        <br/>
      </div>
    );
  }
}

export default TextNoteDetailUpdate;
