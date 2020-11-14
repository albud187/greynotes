import React from 'react'
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { Form, Input, Button, Spin} from 'antd';
import { connect } from 'react-redux';


class Signup extends React.Component {

  state = {
  confirmDirty: false,
};

handleSubmit = (event) => {
  event.preventDefault();
  const username = event.target.elements.userName.value
  const email = event.target.elements.email.value
  const password1 = event.target.elements.password1.value
  const password2 = event.target.elements.password2.value
  this.props.onAuth(
    username,
    email,
    password1,
    password2
  )
  this.props.history.push('/');

}

handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    return (
      <div>

            <form onSubmit={(event)=>this.handleSubmit(event)} class="loginform">
                <input name='userName' placeholder= "username"/>
                <br/>
                <input name='email' placeholder= "email"/>
                <br/>
                <input type="password" name="password1" placeholder="password" />
                <br/>
                <input type="password" name="password2" placeholder="password" />
                <br/>

                <button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                    Signup
                </button>

              </form>
          </div>    )
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
