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
      <List.Item key={item.id}>

        <List.Item.Meta
          title={<a href={"/text_note/"+`${item.id}`}>{item.id} - {item.title}</a>}
        />
        <Row gutter={10}>
          <Col span={5}>
              Date Created: {item.date_created}
          </Col>
          <Col span={5}>
          Group: {item.note_group.slug}
          </Col>

        </Row>


      </List.Item>
    )}
  />
  )
}

export default TextNotes
