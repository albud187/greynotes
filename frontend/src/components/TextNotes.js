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
    itemLayout="vertical"
    size="large"

    dataSource={props.data}

    renderItem={item => (
      <List.Item key={item.title}>
        <List.Item.Meta
          title={<a href={"/text_note/"+`${item.id}`}>{item.id} - {item.title}</a>}
          description={item.description}
        />

      </List.Item>
    )}
  />

  )
}

export default TextNotes
