import React from 'react'
import { Form, Input, Button, Spin } from 'antd';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { LoadingOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const antLoadingOutlined  = <LoadingOutlined style={{ fontSize: 24 }} spin />

class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        this.props.history.push('/');
      }
    });
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }

    return (
        <div>
            {errorMessage}
            {
                this.props.loading ?

                <Spin indicator={antLoadingOutlined } />

                :

                <Form onSubmit={(event)=>this.handleSubmi(event)} className="login-form">
                    <FormItem name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input prefix={<LoadingOutlined  type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </FormItem>

                    <FormItem name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<LoadingOutlined  type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </FormItem>

                    <FormItem>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Login
                    </Button>
                    Or
                    <NavLink
                        style={{marginRight: '10px'}}
                        to='/signup/'> signup
                    </NavLink>
                    </FormItem>
                </Form>
            }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
