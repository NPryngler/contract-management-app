import React, { Component } from 'react';
import "./style.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserContract from "../UserContract";
import ContractsMenu from "../ContractsMenu";
import UpdateUser from "../UpdateUser";
import Popup from "reactjs-popup";

export default class UserContracts extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user-jwt');
    this.state = {
      isLoggedIn: token,
      user: {},
      userContracts: [],

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
    const deleteContract = await fetch('/api/current-user/contracts', {
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
          <div className="user-profile-container">
            <div>
              <button className="button-standard" ><Link className='link' to='/my-contracts/update-user'>Update User Profile</Link></button>
            </div>
            <Popup className="user-details"
              trigger={<button className="button-standard">See Profile Info</button>}
              modal
              closeOnDocumentClick>
              <div className="user-details-container">
                <div className="contract-info">
                  <h3>Name: {this.state.user.name}</h3>
                  <h3>Email: {this.state.user.userEmail}</h3>
                  <h3>Username: {this.state.user.username}</h3>
                  <h3>Zipcode: {this.state.user.userZipcode}</h3>
                  <h3>City: {this.state.user.userCity}</h3>
                  <h3>State: {this.state.user.userState}</h3>
                  <h3>Country: {this.state.user.userCountry}</h3>
                  <h3>Address: {this.state.user.userAddress}</h3>
                  <h3>Birthdate: {this.state.user.birthDate}</h3>
                </div>
              </div>
            </Popup>
          </div>
          <div className="contracts-summary-container">
            <div className='user-contracts'>
              <h2 className='user-contracts-h2'>Your Contracts</h2>
              <div className='add-button-div'>
                <button className='button-standard'> <Link className='link' to='/contracts-menu'>Add New Contract</Link></button>
              </div>
            </div>
            {this.state.userContracts.length > 0 && this.state.userContracts.map(userContract => {
              let count = 0;
              return (
                <UserContract
                  key={userContract.id - `${count += 1}`}
                  id={userContract.id}
                  type={userContract.type}
                  name={userContract.name}
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
                  earlyTerminationDescription={userContract.earlyTerminationDescription}
                  executionDate={userContract.executionDate}
                  filePath={userContract.filePath}
                  contractStatus={userContract.contractStatus}
                  fileUrl={userContract.fileUrl}
                  onClickDeleteButton={() => this.deleteContract(userContract.id)}
                />
              )
            }
            )}
          </div>
        </div>
        <Route exact path="/contracts-menu" component={ContractsMenu} />
      </div>
    )
  }
}
