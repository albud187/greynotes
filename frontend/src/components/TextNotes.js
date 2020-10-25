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
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>



  <List
    itemLayout="vertical"
    size="large"

    dataSource={props.data}

    renderItem={item => (
      <List.Item key={item.id}>

        <List.Item.Meta
          title={<a href={"/text_note/"+`${item.id}`}>{item.id} - {item.title}</a>}
        />
      


        <p>date_created = {item.date_created}</p> <p>group = {item.note_group.slug}</p>


      </List.Item>
    )}
  />
</div>
  )
}

export default TextNotes
