import React, { Component } from 'react';
import "./style.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserContract from "../UserContract";
import ContractsMenu from "../ContractsMenu"

export default class UserContracts extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user-jwt');
    this.state = {
      isLoggedIn: token,
      user: {},
      userContracts: []
    }
  }
  componentDidMount = async () => {
    this.fetchUser();
    this.fetchContracts();
  }

  fetchUser = async () => {
    const user = await (await fetch('/api/current-user', {
      method: "GET",
      headers: {
        "jwt-token": this.state.isLoggedIn,
      }
    })).json();
    this.setState({
      user: user
    });
  }

  fetchContracts = async () => {
    const contracts = await (await fetch('/api/current-user/contracts', {
      method: "GET",
      headers: {
        "jwt-token": this.state.isLoggedIn,
      }
    })).json();

    this.setState({
      userContracts: contracts
    });
  }

  deleteContract = async (id) => {
    const deleteContract = await fetch('/api/current-user/albums', {
      method: "DELETE",
      body: JSON.stringify({ contractId: id }),
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': this.state.isLoggedIn
      }
    });
    this.fetchUser();
    this.fetchContracts();
  }

  render() {
    return (
      <div>
        <div className="user-contracts-container">
          <h1 className='personalize-welcome'>Welcome {this.state.user.name}!</h1>
          <div>
            <button className='update-profile-button'><Link className='update-link' to='/my-contracts/update'>Update Your Profile</Link></button>
          </div>
          <div className="user-container">
            <div className="user-info">
              <h2>Username: {this.state.user.username}</h2>
              <h2>Email: {this.state.user.email}</h2>
              <h2>City: {this.state.user.city}</h2>
            </div>
          </div>
          <div className="contracts-summary-container">
            <div className='user-contracts'>
              <h2 className='user-contracts-h2'>Your Contracts</h2>
            </div>
            {this.state.userContracts.length > 0 && this.state.userContracts.map(userContract => {
              let count = 0;
              return (
                <UserContract
                  key={userContract.id - `${count += 1}`}
                  id={userContract.id}
                  type={userContract.type}
                  clientName={userContract.clientName}
                  clientEmail={userContract.clientEmail} clientPhone={userContract.clientPhone}
                  clientCity={userContract.clientCity}
                  clientState={userContract.clientState}
                  clientCountry={userContract.clientCountry}
                  clientAddress={userContract.clientAddress}
                  serviceDescription={userContract.serviceDescription}
                  serviceFee={userContract.serviceFee}
                  paymentConditions={userContract.paymentConditions}
                  serviceDuedate={userContract.serviceDuedate}
                  earlyTermination={userContract.earlyTermination}
                  executionDate={userContract.executionDate}
                  filePath={userContract.filePath} onClickDeleteButton={() => this.deleteContract(userContract.id)}
                />
              )
            }
            )}
          </div>
          <div className='add-button-div'>
            <button className='addition-button'> <Link className='addition-link' to='/contracts-menu'>Add New Contract</Link></button>
          </div>
        </div>
        <Route exact path="/contracts-menu" component={ContractsMenu} />
      </div>
    )
  }
}
