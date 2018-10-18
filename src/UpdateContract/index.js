import React, { Component } from 'react';
import UserContract from "../UserContract";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';

export default class UpdateContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractId: '',
      contract: {},
      type: '',
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
      contractStatus: '',
      fileUrl: ''
    }
  }

  onInputChange = evt => {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  getContractId = (id) => {
    this.setState({
      contractId: id
    })
  }

  fetchContract = async () => {
    const id = this.props.match.params.id;
    const response = await fetch(`/api/contracts/${id}`)
    const contract = await response.json();
    this.setState({
      contract: contract
    })
  }

  updateContract = async (evt) => {
    evt.preventDefault();
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
      executionDate: this.state.executionDate,
      contractStatus: this.state.contractStatus
    });
    const response = await fetch('/api/contracts/:id', {
      method: 'PUT',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  render() {
    return (
      <div className="forms-wrapper">
        <div className="contract-form-wrapper">
          <h1 className="heading">Update contract</h1>
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
                    <option value={this.state.name}>Use user info</option>
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
                <div className="input-wrapper">
                  <label className="input-title">Contract Status </label>
                  <input
                    className="title-input"
                    type="text"
                    placeholder="status"
                    name="contractStatus"
                    value={this.state.contractStatus}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <button onClick={this.updateUser} className="save-button"><Link className="save-link" to='/my-contracts'>Save Changes</Link></button>
                {/* <UploadFile getFileURL={this.getFileURL}/> */}
              </form>
            </div>
            </div>
            </div>
            </div>
            )
          }
        }
