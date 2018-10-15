import React, { Component } from 'react';
import "./style.css";
import ContractFormSoftDev from "../ContractFormSoftDev";
import { BrowserRouter as Router, Route, Link }from 'react-router-dom';

export default class ContractsMenu extends Component {
  constructor(props){
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
        <div className="make-new-contract-container">
        <button className="form-type-btn"><Link className="form-link" to='/software-dev-form'></Link></button>
        </div>
        <div className="add-existing-contract-container">
        </div>
        <Route exact path="/software-dev-form" component={ContractFormSoftDev} />

      </div>
        
      </div>
    )
  }
}
