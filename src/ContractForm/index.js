import React, { Component } from 'react';
import "./style.css";
import ContractViewSoftDev from "../ContractViewSoftDev";
import ContractViewDesign from "../ContractViewDesign";
import Popup from "reactjs-popup";
import ContractPDF from "../ContractPDF";
import { Redirect } from 'react-router-dom';

export default class ContractForm extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user-jwt');
    this.state = {
      redirectToReferrer: false,
      makePdf: false,
      contract: {},
      user: {},
      type: 'Software Development Agreement',
      isLoggedIn: token,
      name: '',
      newName: '',
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      clientZipcode: "",
      clientCity: "",
      clientState: "",
      clientCountry: "",
      clientAddress: "",
      serviceDescription: "",
      serviceDueDate: "",
      serviceFee: "",
      paymentConditions: "",
      earlyTermination: "",
      stateLocation: "",
      executionDate: "",
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

  makePdf = (event) => {
    this.setState({
      makePdf: true,
    })
    console.log('click');

  }

  saveContract = async (event) => {
    event.preventDefault();
    this.fetchUser();
    const requestBody = JSON.stringify({
      //
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
      executionDate: this.state.executionDate
    });

    const response = await fetch('api/contracts', {
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
          <h1 className="heading">Create</h1>
          <div className="input-container">
            <div className="input-container-form">
              <form onSubmit={this.saveContract}>
                <div className="input-wrapper">
                  <label className="input-title">Select a contract type:
                    <select className="select-wrapper"
                      name="type"
                      value={this.state.type} onChange={this.handleChange}>
                      <option value='Software Development Agreement'>Software Development Agreement</option>
                      <option value='Design Services Agreement'>Design Services Agreement</option>
                    </select>
                  </label>
                </div>
                {/* <div className="input-wrapper">
                  <label className="input-title">Freelancer's complete name </label>
                  <select className="select-wrapper"
                    name="name"
                    onChange={this.handleChange}>
                    <option value={this.state.user.name}>Use user info</option>
                    <option value='new freelancer'>new freelancer</option>
                  </select>
                  {this.state.name === 'new freelancer' && (
                    <div>
                    <input
                      className="title-input"
                      placeholder="Freelancer complete name"
                      name="newName"
                      value={this.state.newName}
                      onChange={this.handleChange}>
                    </input>
                    </div>
                  )}
                </div> */}
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
                  <label className="input-title">Service description <Popup className="clause-info"
                    trigger={<button className="view-details-button"
                    >?</button>}
                    modal
                    closeOnDocumentClick><h3> Describe the services to be rendered, including agreed milestones and other specifities</h3>
                  </Popup></label>
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
                  <label className="input-title">Payment conditions <Popup className="clause-info"
                    trigger={<button className="view-details-button"
                    >?</button>}
                    modal
                    closeOnDocumentClick><h3> Describe the payment conditions, eg. in two installments of 50%, the first due upon acceptance of this aggreement and the last upon delivery</h3>
                  </Popup></label>

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
                  <label className="input-title">Select an early termination clause:
                    <select className="select-wrapper"
                      name="earlyTermination"
                      value={this.state.earlyTermination} onChange={this.handleChange}>
                      <option value=' any unpaid fees prorated for the portion of the work completed at the time of termination.'>Pro Rata Payment Clause</option>
                      <option value=' liquidated damages in the amount of __________, which the parties agree represents fair compensation for the harm Freelancer would suffer from termination'>Liquidated Damages Clause</option>
                    </select>
                  </label>
                </div>
                <div className="input-wrapper">
                  <label className="input-title">When is this contract being signed?</label>
                  <input
                    className="title-input"
                    type="date"
                    placeholder="execution date"
                    name="executionDate"
                    value={this.state.executionDate}
                    onChange={this.handleChange}>
                  </input>
                </div>
                <div className="button-container">
                  <button
                    className="button-standard"
                    onClick={this.saveContract}
                    type="submit">
                    Save Contract
                    </button>
                </div>
              </form>
              {/* <div className="button-standard">
                  <button
                    className="create-pdf"
                    onClick={this.makePdf}
                    type="submit">
                    PDF file
                    </button>
                </div> */}
            </div>
          </div>
        </div>
        <div className="contract-view-wrapper">
          {this.state.type === 'Software Development Agreement' && (
            <ContractViewSoftDev
              userProps={this.state.user}
              userNameProps={this.state.user.name}
              newNameProps={this.state.newName}
              clientNameProps={this.state.clientName}
              serviceDescriptionProps={this.state.serviceDescription}
              serviceDueDateProps={this.state.serviceDueDate}
              serviceFeeProps={this.state.serviceFee}
              paymentConditionsProps={this.state.paymentConditions}
              earlyTerminationProps={this.state.earlyTermination}
              stateLocationProps={this.state.user.userState}
              executionDateProps={this.state.executionDate}
            />
          )}


          {this.state.type === 'Design Services Agreement' && (
            <ContractViewDesign
              userProps={this.state.user}
              userNameProps={this.state.user.name}
              newNameProps={this.state.newName}
              clientNameProps={this.state.clientName}
              serviceDescriptionProps={this.state.serviceDescription}
              serviceDueDateProps={this.state.serviceDueDate}
              serviceFeeProps={this.state.serviceFee}
              paymentConditionsProps={this.state.paymentConditions}
              earlyTerminationProps={this.state.earlyTermination}
              stateLocationProps={this.state.user.userState}
              executionDateProps={this.state.executionDate}
            />
          )}

        </div>


        {/* <div>
        {this.state.makePdf === true &&this.state.type === 'Software Development Agreement' && (
          <ContractPDF
            userProps={this.state.user}
            userNameProps={this.state.user.name}
            newNameProps={this.state.newName}
            clientNameProps={this.state.clientName}
            serviceDescriptionProps={this.state.serviceDescription}
            serviceDueDateProps={this.state.serviceDueDate}
            serviceFeeProps={this.state.serviceFee}
            paymentConditionsProps={this.state.paymentConditions}
            earlyTerminationProps={this.state.earlyTermination}
            stateLocationProps={this.state.user.userState}
            executionDateProps={this.state.executionDate}
          />
          )}
          </div> */}

      </div>
    )
  }
}
