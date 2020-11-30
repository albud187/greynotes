import React from 'react';

import { List } from 'antd';
import { Card } from 'antd';
import axios from 'axios'
import ArchiveTextNoteCheckbox from '../forms/ArchiveTextNoteCheckbox.js'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

const TextNotes =(props)=>{
  var ItemInfo ='blank'
  const ChangeStatus = (event,itemid) =>{
  event.preventDefault()
    console.log('test')
    axios.get(`${API_PATH}api/TextNotes/${itemid}/`)
      .then(res=>{ItemInfo=res.data})
      console.log(ItemInfo)
  }
  return(

  <List
    grid={{ gutter: 16, column: 4}}

    dataSource={props.data}

    renderItem={item => (
      <List.Item key={item.id}>
      <Card>
        <List.Item.Meta
          title={<a href={"/text_note/"+`${item.id}`}>
          {item.id} - {item.title}
          </a>}/>

        <p><strong>date created</strong> : {item.date_created}</p>
        <p><strong>group</strong>: {item.note_group_name}</p>
        <ArchiveTextNoteCheckbox
        data={item}/>
        Archive

        </Card>
      </List.Item>
    )}
  />
  )
}

export default TextNotes
