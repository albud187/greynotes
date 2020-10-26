import React from 'react';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';
import { Card } from 'antd';


const IconText = ({ icon, text }) => (
<Space>
{React.createElement(icon)}
{text}
</Space>
);

const TextNotes =(props)=>{
  return(

  <List
    grid={{ gutter: 16, column: 6}}

    dataSource={props.data}

    renderItem={item => (
      <List.Item key={item.id}>
      <Card>
        <List.Item.Meta
          title={<a href={"/text_note/"+`${item.id}`}>
          {item.id} - {item.title}
          </a>}

        />

        <p>date_created = {item.date_created}</p> <p>group = {item.note_group}</p>

        </Card>
      </List.Item>
    )}
  />

  )
}

export default TextNotes
