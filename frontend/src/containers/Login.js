import React from 'react'
import { Form, Input, Button } from 'antd';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

class Login extends React.Component {

  handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      this.props.onAuth(values.userName, values.password);
      this.props.history.push('/');
    }
  });
}

  render() {
    return (
      <div>Login Form Class component</div>
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
