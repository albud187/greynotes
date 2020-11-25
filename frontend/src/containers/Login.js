import React from 'react'
import { Form, Input, Button, Spin } from 'antd';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { LoadingOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = (event) => {
    this.forceUpdate()
    const username = event.target.elements.userName.value
    const password = event.target.elements.pwd.value
    this.props.onAuth(username, password);
    this.props.history.push('/');
    console.log('token is ' + localStorage.getItem('token'))
    this.forceUpdate()
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
          <br></br>
          <p>Forgot password? <a href='/request-reset-email/'>reset it here</a></p>
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
