import React, { Component } from 'react';
import "./style.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class ContractFormSoftDev extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user-jwt');
    this.state = {
      user: {},
      type: "Software Development Agreement",
      // isLoggedIn: token,
      // isUserAParty: true,
      clientName: "Client's complete name ",
      clientPhone: "+1(000)000 0000",
      clientEmail: "Client's e-mail address",
      clientZipcode: "Client`s zipcode",
      clientCity: "Client's City",
      clientState: "Client's State",
      clientCountry: "Client's Country",
      clientAddress: "Client's complete name ",
      serviceDescription: JSON.parse(localStorage.getItem("service-description")) || "Describe what the developer will do. Include any milestones.",
      serviceDueDate: JSON.parse(localStorage.getItem("service-duedate")) || "",
      serviceFee: JSON.parse(localStorage.getItem("service-fee")) || 0.00,
      paymentConditions: JSON.parse(localStorage.getItem("payment-conditions")) || ' describe, eg. in two installments of 50%, the first due upon acceptance of this aggreement and the last upon delivery',
      earlyTermination: JSON.parse(localStorage.getItem("early-termination")) || " any unpaid fees prorated for the portion of the work completed at the time of termination.",
      stateLocation: JSON.parse(localStorage.getItem("state-location")) || "",
      executionDate: JSON.parse(localStorage.getItem("execution-date")) || "",
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
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  

  saveChanges = async (event) => {
    event.preventDefault();
    const requestBody = JSON.stringify({
      //
      userId: this.state.user.userId,
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

    const response = await fetch ('api/contracts', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-type': 'application/json'
      }
    });


   
    // this.setState({

    //   freelancerName: `${this.state.freelancerName}`,
    //   serviceDescription: `${this.state.serviceDescription}`,
    //   clientName: `${this.state.clientName}`,
    //   serviceDueDate: `${this.state.serviceDueDate}`,
    //   serviceFee: `${this.state.serviceFee}`,
    //   paymentConditions: `${this.state.paymentConditions}`,
    //   earlyTermination: `${this.state.earlyTermination}`,
    //   stateLocation: `${this.state.stateLocation}`,
    //   executionDate: `${this.state.executionDate}`,
    // })


    // localStorage.setItem('freelancer-name', JSON.stringify(freelancerName));
    // localStorage.setItem('client-name', JSON.stringify(clientName));
    // localStorage.setItem('service-description', JSON.stringify(serviceDescription));
    // localStorage.setItem('service-duedate', JSON.stringify(serviceDueDate));
    // localStorage.setItem('service-fee', JSON.stringify(serviceFee));
    // localStorage.setItem('payment-conditions', JSON.stringify(paymentConditions));
    // localStorage.setItem('early-termination', JSON.stringify(earlyTermination));
    // localStorage.setItem('state-location', JSON.stringify(stateLocation));
    // localStorage.setItem('execution-date', JSON.stringify(executionDate));


  }

  
  render() {
    return (
      <div className="forms-wrapper">
        <div className="contract-form-wrapper">
          <h1 className="heading">Create</h1>
          <div className="input-container">
            <div className="input-container-form">
              <form onClick={this.handleSubmit}>

                <div className="input-wrapper">
                  <label className="input-title">Freelancer's complete name</label>
                  <input
                    className="title-input"
                    placeholder="Freelancer complete name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}>
                  </input>
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
                {/* <div className="input-wrapper">
                  <label className="input-title">Location</label>
                  <input
                    className="title-input"
                    type="text"
                    placeholder="Which State are you based?"
                    stateLocation={this.state.value}
                    onChange={this.handleChangeStateLocation}>
                  </input>
                </div> */}
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
                <div className="button-save">
                  <button
                    className="create-contract"
                    onClick={this.saveChanges}
                    type="submit">
                    Save Contract
                                </button>
                </div>
              </form>

            </div>
          </div>
        </div>
        <div className="contract-view-wrapper">
          <ContractView
            userProps={this.state.user}
            freelancerNameProps={this.state.freelancerName}
            clientNameProps={this.state.clientName}
            serviceDescriptionProps={this.state.serviceDescription}
            serviceDueDateProps={this.state.serviceDueDate}
            serviceFeeProps={this.state.serviceFee}
            paymentConditionsProps={this.state.paymentConditions}
            earlyTerminationProps={this.state.earlyTermination}
            stateLocationProps={this.state.stateLocation}
            executionDateProps={this.state.executionDate}
          />
        </div>
      </div>

    )
  }
}
