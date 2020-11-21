import React, { Component } from 'react'
import axios from 'axios'
class Home extends Component {
  render() {
    return (
      <div>

      {localStorage['token'] ?
        <h1> welcome user # {localStorage['token']} </h1>


      :
      <div>
      <h1>Log in or sign up</h1>
      <p>greynotes is a note taking web app </p>
      <p> you can create notes in the form of text and checklists </p>
      </div>
      }


      </div>
    )
  }
}

export default Home
