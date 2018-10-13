import React, { Component } from 'react';
import "./style.css";
import { Redirect } from 'react-router-dom';


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      name: '',
      username: '',
      password: '',
      userPhone: '',
      email: '',
      city: '',
      userState: '',
      userCountry: '',
      userAddress: '',
      birthDate: '',
      message: '',
      valid: false,
      usernameValidationMessge: '',
      emailValidationMessage: '',
      passwordValidationMessage: '',
      usernameBorder: '',
      emailBorder: '',
      passwordBorder: '',
    }
  }
  onInputChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  isEmailPasswordValid = () => {
    let isValid = true;
    let emailRegex = /@/;
    let specialCharacterPattern = /[!@()#$%&'*+/=?^_`{|}~-]+/;
    let numberPattern = /\d/;
    let usernameRedBorder;
    let emailRedBorder;
    let passwordRedBorder;
    let usernameMessage;
    let emailMessage;
    let passwordMessage;

    if (this.state.username.length === 0) {
      isValid = false;
      usernameRedBorder = 'solid 2px red';
      usernameMessage = 'A username is required for registration';
    }
    if (!emailRegex.exec(this.state.email)) {
      isValid = false;
      emailRedBorder = 'solid 2px red';
      emailMessage = 'Email address is invalid!';
    }
    if (this.state.password.length < 7 || !specialCharacterPattern.exec(this.state.password) || !numberPattern.exec(this.state.password)) {
      isValid = false;
      passwordRedBorder = 'solid 2px red';
      passwordMessage = 'Password is invalid! Password must be at least 7 characters long and include at least one number and one special character';
    }
    this.setState({
      valid: isValid,
      usernameBorder: usernameRedBorder,
      emailBorder: emailRedBorder,
      passwordBorder: passwordRedBorder,
      usernameValidationMessage: usernameMessage,
      emailValidationMessage: emailMessage,
      passwordValidationMessage: passwordMessage
    });
  }

  isValid = () => {
    this.isEmailPasswordValid();
  }

  register = async (event) => {
    event.preventDefault();

    if (this.state.valid) {
      const requestBody = JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        city: this.state.city,
        userPhone: this.state.userPhone,
        userState: this.state.userState,
        userCountry: this.state.userCountry,
        userAddress: this.state.userAddress,
        birthDate: this.state.birthDate
      });

      const response = await fetch('/api/register', {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseBody = await response.json();
      if (response.status === 409) {
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
  }
  render() {
    const emailStyle = {
      border: this.state.emailBorder,
      outline: 'none',
    }
    const passwordStyle = {
      border: this.state.passwordBorder,
      outline: 'none',
    }
    const usernameStyle = {
      border: this.state.usernameBorder,
      outline: 'none',
    }

    const { from } = this.props.location.state || { from: { pathname: "/my-collection" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="register-form">
        <form className="form" onSubmit={this.register}>
          <div className="input-container">
            <label className="register-label">Name: </label>
            <br />
            <input type='text' placeholder='Name' onChange={this.onInputChange} name='name' value={this.state.name}>
            </input>
          </div>
          <div className="input-container">
            <label className="register-label">Username: </label>
            <br />
            <input type='text' placeholder='Username' onChange={this.onInputChange} name='username' value={this.state.username} style={usernameStyle}>
            </input>
            <p className="error-message">{this.state.usernameValidationMessage}</p>
          </div>
          <div className="input-container">
            <label className="register-label">Email: </label>
            <br />
            <input type='text' placeholder='Email' onChange={this.onInputChange} name='email' value={this.state.email} style={emailStyle}>
            </input>
            <p className="error-message">{this.state.emailValidationMessage}</p>
          </div>
          <div className="input-container">
            <label className="register-label">Password: </label>
            <br />
            <input type='password' placeholder='Password' onChange={this.onInputChange} name='password' value={this.state.password} style={passwordStyle}>
            </input>
            <p className="error-message">{this.state.passwordValidationMessage}</p>
          </div>
          <div className="input-container">
            <label className="register-label">Phone number: </label>
            <br />
            <input type='text' placeholder='+1 (000)0000000' onChange={this.onInputChange} name='userPhone' value={this.state.userPhone}>
            </input>
          </div>
          <div className="input-container">
            <label className="register-label">City: </label>
            <br />
            <input type='text' placeholder='City' onChange={this.onInputChange} name='city' value={this.state.city}>
            </input>
          </div>
          <div className="input-container">
            <label className="register-label">State: </label>
            <br />
            <input type='text' placeholder='State' onChange={this.onInputChange} name='userState' value={this.state.userState}>
            </input>
          </div>
          <div className="input-container">
            <label className="register-label">Country: </label>
            <br />
            <input type='text' placeholder='Country' onChange={this.onInputChange} name='userCountry' value={this.state.userCountry}>
            </input>
          </div>
          <div className="input-container">
            <label className="register-label">Address: </label>
            <br />
            <input type='text' placeholder='Adress' onChange={this.onInputChange} name='userAddress' value={this.state.userAddress}>
            </input>
          </div>
          <div className="input-container">
            <label className="register-label">Birthdate: </label>
            <br />
            <input type='date' placeholder='Birthdate' onChange={this.onInputChange} name='birthDate' value={this.state.birthDate} min="1920-01-01" max="2010-01-01">
            </input>
          </div>
          <div>
            {this.state.valid && (
              <button className="register-button">Register</button>
            )}
            {!this.state.valid && (
              <button className="register-button" onClick={this.isValid}>Ok</button>
            )}
            {
              this.state.message &&
              <h3>{this.state.message}</h3>
            }
          </div>
        </form>
      </div >
    )
  }
}

