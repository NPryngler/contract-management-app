import React, { Component } from 'react';
import "./style.css";
// import ContractDetails from '../ContractDetails';
import Popup from "reactjs-popup";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class UserContract extends Component {


  onClick = async (id) => {
    this.setState({
      id: id
    });
    this.getContractId(id);
  }
  render() {
    return (

      <div className="contract-container">
        <div className="contract-summary-container">
          <table>
            <tr>
              <th>Contract type</th>
              <th>Client name</th>
              <th>Contract date</th>
              <th>Delivery date</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>{this.props.type}</td>
              <td>{this.props.clientName}</td>
              <td>{this.props.executionDate}</td>
              <td>{this.props.serviceDueDate}</td>
            </tr>
          </table>
        </div>
        <div className="buttons-container">
          <Popup className="contract-details"
            trigger={<button className="view-details-button">See More</button>}
            modal
            closeOnDocumentClick>
            <div className="contract-details-container">
              <div className="contract-info">
                <h3>Type: {this.props.type}</h3>
                <h3>Client Name: {this.props.clientName}</h3>
                <h3>Client Email: {this.props.clientEmail}</h3>
                <h3>Client Phone number: {this.props.clientPhone}</h3>
                <h3>Client City: {this.props.clientCity}</h3>
                <h3>Client State: {this.props.clientState}</h3>
                <h3>Client Country: {this.props.clientCountry}</h3>
                <h3>Client Address: {this.props.clientAddress}</h3>
                <h3>Service description: {this.props.serviceDescription}</h3>
                <h3>Service Fee: {this.props.serviceFee}</h3>
                <h3>Payment conditions: {this.props.paymentConditions}</h3>
                <h3>Service delivery date: {this.props.serviceDueDate}</h3>
                <h3>Early termination clause: {this.props.earlyTermination}</h3>
                <h3>Early termination clause description : {this.props.earlyTerminationDescription}</h3>
                <h3>Execution date: {this.props.executionDate}</h3>
                <h3>Contract file: {this.props.filePath}</h3>
              </div>
            </div>
          </Popup>
          <div>
            <button className='delete-button' onClick={this.props.onClickDeleteButton}>Delete from contracts</button>
          </div>
          <div>
            <button className='update-button' onClick={this.onClick}><Link className="link" to='/my-contracts/update-contract'>Update contract</Link></button>
          </div>
        </div>
      </div>
    )

  }
}   
