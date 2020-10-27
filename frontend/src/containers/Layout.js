import React from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const CustomLayout = (props)=>{
  return(
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/text_note_list">Text Notes</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">List Notes (just goes to home rn)</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">Note Groups (just goes to home rn)</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/meme-text-gen/">Meme Text Generator</Link></Breadcrumb.Item>

        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          {props.children}
        </div>
      </Content>
    </Layout>



  )
}

export default CustomLayout
