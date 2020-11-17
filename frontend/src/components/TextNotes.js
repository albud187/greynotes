import React from 'react';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';
import {Checkbox} from 'antd'
import axios from 'axios'

const TextNotes =(props)=>{
  var ItemInfo ='blank'
  const ChangeStatus = (event,itemid) =>{
  event.preventDefault()
    console.log('test')
    axios.get(`http://127.0.0.1:8000/api/TextNotes/${itemid}/`)
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
        <Checkbox
        checked={item.archived}
        onChange={(event)=>ChangeStatus(event,item.id)}>
        Archive
        </Checkbox>
        </Card>
      </List.Item>
    )}
  />
  )
}

export default TextNotes
