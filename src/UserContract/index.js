import React, { Component } from 'react';
import "./style.css";
// import ContractDetails from '../ContractDetails';
import Popup from "reactjs-popup";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class UserContract extends Component {
  contractClick = async (id) => {
    this.setState({
      id: id
    });
  }
  render() {
    return (

      <div className="contract-container" onClick={this.contractClick}>

        <div className="contract-summary-container">
          <div className="contract-type">{this.props.type}</div>
          <div className="client-name">{this.props.clientName}</div>
          <div className="client-name">{this.props.executionDate}</div>

        </div>
        <Popup className="contract-details"
          trigger={<button className="view-details-button">See More</button>}
          modal
          closeOnDocumentClick>
          <div className="contract-details-container">
            <div className="contract-info">
              <h2>Type: {this.props.type}</h2>
              <h2>Client Name: {this.props.clientName}</h2>
              <h2>Client Email: {this.props.clientEmail}</h2>
              <h2>Client Phone number: {this.props.clientPhone}</h2>
              <h2>Client City: {this.props.clientCity}</h2>
              <h2>Client State: {this.props.clientState}</h2>
              <h2>Client Country: {this.props.clientCountry}</h2>
              <h2>Client Address: {this.props.clientAddress}</h2>
              <h2>Service description: {this.props.serviceDescription}</h2>
              <h2>Service Fee: {this.props.serviceFee}</h2>
              <h2>Payment conditions: {this.props.paymentConditions}</h2>
              <h2>Service delivery date: {this.props.serviceDueDate}</h2>
              <h2>Early termination clause: {this.props.earlyTermination}</h2>
              <h2>Early termination clause description : {this.props.earlyTerminationDescription}</h2>
              <h2>Execution date: {this.props.executionDate}</h2>
              <h2>Contract file: {this.props.filePath}</h2>
            </div>
          </div>
        </Popup>
        <div>
          <button className='delete-button' onClick={this.props.onClickDeleteButton}>Delete from contracts</button>
        </div>
        <div>
          <button className='update-button' onClick={this.props.onClickDeleteButton}>Update contract</button>
        </div>
      </div>
    )

  }
}   
