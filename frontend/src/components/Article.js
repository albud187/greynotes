import React from 'react';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const IconText = ({ icon, text }) => (
<Space>
{React.createElement(icon)}
{text}
</Space>
);

const Articles =(props)=>{
  return(
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 50,
    }}
    dataSource={props.data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}


      >
        <List.Item.Meta
          title={<a href={"/TextNote/"+`${item.id}`}>{item.id} - {item.title}</a>}
          description={item.description}
        />
        
      </List.Item>
    )}
  />

  )
}

export default Articles
