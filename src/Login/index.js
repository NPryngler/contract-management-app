import React, { Component } from 'react';
import "./style.css";
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      username: '',
      password: '',
      message: ''
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = async (event) => {
    event.preventDefault();
    const requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    const response = await fetch('/api/login', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.json();
    if (response.status === 401) {
      this.setState({
        message: responseBody.message
      });
      return;
    }

    localStorage.setItem('user-jwt', responseBody.token);
    this.setState({
      redirectToReferrer: true,
    });
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/my-contracts" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    } else {
      return (
        <div>
          <div className='home-wrapper'>
            <div className="welcome-container">
              <h2>Welcome to My Contract Manager</h2>
              <h3>Log in or register to start creating and managing your contracts</h3>
              <div className="login-container">
                <div className="form-container">
                  <form onSubmit={this.login}>
                    <div className="form-input">
                      <label>Username: </label>
                      <input type="text" placeholder='username' onChange={this.handleChange} name='username' value={this.state.username}></input>
                    </div>
                    <div className="form-input">
                      <label>Password: </label>
                      <input type="password" placeholder='password' onChange={this.handleChange} name='password' value={this.state.password}></input>
                    </div>
                    <button className="login-button">login</button>
                  </form>
                  {this.state.message &&
                    <h3>{this.state.message}</h3>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
