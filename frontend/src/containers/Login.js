import React from 'react'
import { Form, Input, Button, Spin } from 'antd';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { LoadingOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.userName.value
    const password = event.target.elements.pwd.value
    this.props.onAuth(username, password);
    this.props.history.push('/');

    };



  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }

    return (
        <div>

        <form onSubmit={(event)=>this.handleSubmit(event)} class="loginform">
            <input name='userName' placeholder= "username"/>
            <br/>
            <input type="password" name="pwd" placeholder="password" />
            <br/>

            <button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                Login
            </button>

          </form>
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