import React, { Component } from 'react';
import "./style.css";
import ContractForm from "../ContractForm";
import AddContract from "../AddContract";
import { BrowserRouter as PrivateRoute, Router, Route, Link } from 'react-router-dom';

export default class ContractsMenu extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user-jwt');
    this.state = {
      user: {},
      isLoggedIn: token,
    }
  }
  render() {
    return (
      <div
        className="contracts-menu-container">
        <h1 className="menu-header">Do you want to make a new contract or just file and manage an existing one? </h1>
        <div className="options-container">
          <div className="option-container">
        <button className="button-menu"><Link className="link-menu" to='/contract-form'>Generate a contract</Link></button>
        </div>
          <div className="option-container">
          <button className="button-menu"><Link className="link-menu" to='/add-contract'>Add an existing contract</Link></button>
          </div>
          
        </div>
      </div>
    )
  }
}
