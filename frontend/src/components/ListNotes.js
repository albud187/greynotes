import React from 'react';

import { List} from 'antd';
import { Card } from 'antd';

import ArchiveListNoteCheckbox from '../forms/ArchiveListNoteCheckbox.js'

import * as API_PATHS from '../api_path.js'
const API_PATH = API_PATHS.API_PATH

const ListNotes =(props)=>{

  return(

  <List
    grid={{ gutter: 16, column: 4}}

    dataSource={props.data}

    renderItem={item => (
      <List.Item key={item.id}>
      <Card>
        <List.Item.Meta
          title={<a href={"/list_note/"+`${item.id}`}>
          {item.id} - {item.title}
          </a>}/>

        <p><strong>date created</strong> : {item.date_created}</p>
        <p><strong>group</strong>: {item.note_group_name}</p>
        <ArchiveListNoteCheckbox
        data={item}/>
        Archive

        </Card>
      </List.Item>
    )}
  />
  )
}

export default ListNotes
