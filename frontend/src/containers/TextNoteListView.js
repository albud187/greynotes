import React from 'react'
import axios from 'axios';
import { connect } from "react-redux";

import TextNotes from '../components/TextNotes.js'
import {Link} from 'react-router-dom'
class TextNoteListView extends React.Component{

  state ={
    text_notes: [],
    userinfo:null,
    tokeninfo:null,
  }

  fetchTextNotes = () => {
    axios.get("http://127.0.0.1:8000/api/TextNotes/").then(res => {
      this.setState({
        text_notes: res.data
      });
      console.log(res.data)
    });
  }

  fetchUser = () => {
    const usertoken = this.props.token
    axios.get(`http://127.0.0.1:8000/api/Tokens/${usertoken}/`).then(res=>{
      this.setState({
        userinfo:res.data
      });
      console.log(res.data)
    })
  }

  componentDidMount() {
    const useridtoken = localStorage['token']
    this.setState({
      tokeninfo:useridtoken
    })
    this.fetchUser();
    this.fetchTextNotes();
  }

  render(){
    return(
      <div>
      <h1> TextNoteListView.js</h1>
      <h1> useridtoken={this.state.tokeninfo} </h1>
      { this.state.userinfo ?
        <h1> userid is = {this.state.userinfo.user} </h1>
        :
        <h1>userid here </h1>
      }
      <h2><Link to="/create_note">New Note</Link></h2>

        <TextNotes data ={this.state.text_notes}/>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps) (TextNoteListView)
