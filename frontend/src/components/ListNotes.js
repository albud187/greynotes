import React from 'react';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';

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

        </Card>
      </List.Item>
    )}
  />
  )
}

export default ListNotes
