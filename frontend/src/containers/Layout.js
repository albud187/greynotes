import React from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const CustomLayout = (props)=>{
  return(
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">

          <Menu.Item key="1"><Link to='/login/'>Login</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/signup/'>Sign up</Link></Menu.Item>

          {props.isAuthenticated ?
          <Menu.Item key="3">IS AUTH</Menu.Item>
          :
          <Menu.Item key="3">NOT AUTH</Menu.Item>
          }



        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/text_note_list">Text Notes</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/list_note_list">List Notes</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/filter_notes">Note Groups</Link></Breadcrumb.Item>
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
