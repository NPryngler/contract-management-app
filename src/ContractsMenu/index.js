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
        <h1 className="menu-header">Do you want to make a new one or just file and manage an existing one? </h1>
        <div className="options container">
          <div className="make-new-contract-container">make new contract
        <button className="form-type-btn"><Link className="form-link" to='/contract-form'>make new </Link></button>
        </div>
          <div className="add-existing-contract-container">add existing contract
          <button className="form-type-btn"><Link className="form-link" to='/add-contract'>add existing </Link></button>
          </div>
          
        </div>
      </div>
    )
  }
}
