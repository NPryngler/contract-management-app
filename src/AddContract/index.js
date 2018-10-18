import React, { Component } from 'react';
import "./style.css";
import Popup from "reactjs-popup";
// import UploadFile from "../UploadFile";
import { Redirect } from 'react-router-dom';

export default class AddContract extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user-jwt');
    this.state = {
      redirectToReferrer: false,
      user: {},
      contract: {},
      type: '',
      isLoggedIn: token,
      isUserAParty: true,
      name: '',
      newName: '',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientZipcode: '',
      clientCity: '',
      clientState: '',
      clientCountry: '',
      clientAddress: '',
      serviceDescription: '',
      serviceDueDate: '',
      serviceFee: 0,
      paymentConditions: '',
      earlyTermination: '',
      stateLocation: '',
      executionDate: '',
      fileUrl: ''
    }
  }



  componentDidMount = async () => {
    this.fetchUser();
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


  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getImageURL = (url) => {
    this.setState({
        fileUrl: url
    })
}
 
  saveContract = async (event) => {
    event.preventDefault();
    this.fetchUser();

    const requestBody = JSON.stringify({
      type: this.state.type,
      name: this.state.name,
      newName: this.state.newName,
      clientName: this.state.clientName,
      clientPhone: this.state.clientPhone,
      clientZipcode: this.state.clientZipcode,
      clientCity: this.state.clientCity,
      clientState: this.state.clientState,
      clientCountry: this.state.clientCountry,
      clientAddress: this.state.clientAddress,
      serviceDescription: this.state.serviceDescription,
      serviceFee: this.state.serviceFee,
      paymentConditions: this.state.paymentConditions,
      serviceDueDate: this.state.serviceDueDate,
      earlyTermination: this.state.earlyTermination,
      earlyTerminationDescription: this.state.earlyTerminationDescription,
      executionDate: this.state.executionDate
    });


    const response = await fetch('/api/contracts', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-type': 'application/json',
        'jwt-token': this.state.isLoggedIn
      }
    });
    console.log(requestBody);
    this.setState({
      redirectToReferrer: true,
    });

  }




  render() {
    const { from } = this.props.location.state || { from: { pathname: "/my-contracts" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="forms-wrapper">
        <div className="contract-form-wrapper">
          <h1 className="heading">Add contract</h1>
          <div className="input-container">
            <div className="input-container-form">
              <form onSubmit={this.saveContract}>
                <div className="input-wrapper">
                  <label className="input-title">Contract type:
                  <input
                      className="title-input"
                      placeholder="Contract type"
                      name="type"
                      value={this.state.type}
                      onChange={this.handleChange}>
                    </input>
                  </label>
                </div>  
                <div className="input-wrapper">
                  <label className="input-title">Contracted party name</label>
                  <select className="select-wrapper"
                    name="name"
                    onChange={this.handleChange}>
                    <option value={this.state.user.name}>Use user info</option>
                    <option value='new party'>new party</option>
                  </select>
                  {this.state.name === 'new party' && (
                    <div>
                      <input
                        className="title-input"
                        placeholder="complete name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}>
                      </input>
                    </div>
                  )}
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's complete name</label>
                  <input
                    className="title-input"
                    placeholder="Client's complete name"
                    name="clientName"
                    value={this.state.clientName}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's phone</label>
                  <input
                    className="title-input"
                    placeholder="+1(000) 000 0000"
                    name="clientPhone"
                    value={this.state.clientPhone}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's e-mail</label>
                  <input
                    className="title-input"
                    placeholder="Client's e-mail"
                    name="clientEmail"
                    value={this.state.clientEmail}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's Zipcode</label>
                  <input
                    className="title-input"
                    placeholder="Client's zipcode"
                    name="clientZipcode"
                    value={this.state.clientZipcode}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's City</label>
                  <input
                    className="title-input"
                    placeholder="Client's City"
                    name="clientCity"
                    value={this.state.clientCity}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's State</label>
                  <input
                    className="title-input"
                    placeholder="Client's State"
                    name="clientState"
                    value={this.state.clientState}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's country</label>
                  <input
                    className="title-input"
                    placeholder="Client's Country"
                    name="clientCountry"
                    value={this.state.clientCountry}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Client's address</label>
                  <input
                    className="title-input"
                    placeholder="Client's e-mail"
                    name="clientAddress"
                    value={this.state.clientAddress}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Service description</label>
                  <input
                    className="title-input"
                    placeholder="service description"
                    name="serviceDescription"
                    value={this.state.serviceDescription}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Service due date</label>
                  <input
                    className="title-input"
                    type="date"
                    placeholder="due date"
                    name="serviceDueDate"
                    value={this.state.serviceDueDate}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Service fee</label>
                  <input
                    className="title-input"
                    type="number"
                    placeholder="$"
                    name="serviceFee"
                    value={this.state.serviceFee}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Payment conditions</label>
                  <input
                    className="title-input"
                    type="text"
                    placeholder="specify the payment conditions"
                    name="paymentConditions"
                    value={this.state.paymentConditions}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title"> Early termination clause:
                    <select className="select-wrapper"
                      name="earlyTermination"
                      value={this.state.earlyTermination} onChange={this.handleChange}>
                      <option value='yes'>Yes</option>
                      <option value='no'>No</option>
                    </select>
                  </label>
                  <label className="input-title">Describe</label>
                  <input
                    className="title-input"
                    type="text"
                    placeholder="describe early termination clause"
                    name="earlyTerminationDescriptio"
                    value={this.state.earlyTerminationDescription}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">Signature date</label>
                  <input
                    className="title-input"
                    type="date"
                    placeholder="execution date"
                    name="executionDate"
                    value={this.state.executionDate}
                    onChange={this.handleChange}>
                  </input>
                </div>
                {/* <UploadFile getFileURL={this.getFileURL}/> */}
              </form>
            </div>
            <Popup className="contract-details"
              trigger={<button className="view-details-button"
              >View</button>}
              modal
              closeOnDocumentClick>
              <div className="contract-details-container">
                <div className="contract-info">
                  <h2>Type: {this.state.type}</h2>
                  <h2>Client Name: {this.state.clientName}</h2>
                  <h2>Client Email: {this.state.clientEmail}</h2>
                  <h2>Client Phone number: {this.state.clientPhone}</h2>
                  <h2>Client City: {this.state.clientCity}</h2>
                  <h2>Client State: {this.state.clientState}</h2>
                  <h2>Client Country: {this.state.clientCountry}</h2>
                  <h2>Client Address: {this.state.clientAddress}</h2>
                  <h2>Service description: {this.state.serviceDescription}</h2>
                  <h2>Service Fee: {this.state.serviceFee}</h2>
                  <h2>Payment conditions: {this.state.paymentConditions}</h2>
                  <h2>Service delivery date: {this.state.serviceDueDate}</h2>
                  <h2>Early termination clause: {this.state.earlyTermination}</h2>
                  <h2>Early termination clause description : {this.state.earlyTerminationDescription}</h2>
                  <h2>Execution date: {this.state.executionDate}</h2>

                </div>
              </div>
            </Popup>
            <div>
              <button className="view-details-button"
                onClick={this.saveContract}>Save</button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
